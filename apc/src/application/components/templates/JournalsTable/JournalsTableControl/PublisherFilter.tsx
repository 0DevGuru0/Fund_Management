import React, { FC, useState } from 'react';

import esb from 'elastic-builder';
import { compact, concat, isEmpty, uniq } from 'lodash';

import { Autocomplete } from '$application/components/organisms/inputs/Autocomplete';
import { RenderComponent } from '$application/components/organisms/tables/Table/Filter/filterTypes';
import { useGetPublishersNameQuery } from '$application/lib/generated/repoGqlTypes';

const limit = 10;
let aggregatedPublishers;
let publishers: string[] = [];
const initQuery = esb
  .boolQuery()
  .must(esb.matchQuery('schema.keyword', 'Organization'))
  .filter(esb.termQuery('Organization.type.keyword', 'Publisher'));

export const PublisherFilter: FC<RenderComponent> = ({
  input,
  filterHandler,
  selectedItems,
}) => {
  const [offset, setOffset] = useState<number>(0);
  const [elasticQuery, setElasticQuery] = useState<Record<string, any>>(initQuery);

  const [{ data }] = useGetPublishersNameQuery({
    pause: isEmpty(elasticQuery),
    variables: {
      limit,
      offset,
      query: elasticQuery,
    },
  });

  aggregatedPublishers = uniq(compact(concat(aggregatedPublishers, data?.search.items)));

  const onFilterTermChanged = (newTerm: string) => {
    // If the input is empty, all items should be show, otherwise only filtered
    let query;
    if (newTerm) {
      query = esb
        .boolQuery()
        .must(esb.multiMatchQuery(['title^2', 'title.suggestion'], newTerm))
        .filter(esb.termQuery('schema.keyword', 'Organization'))
        .filter(esb.termQuery('Organization.type.keyword', 'Publisher'));
    }
    setElasticQuery(query ?? initQuery);
  };

  const onFilterSelect = (selectedPublisher) => {
    const publisher = aggregatedPublishers.find(
      (item) => item.__typename === 'Organization' && item.title === selectedPublisher,
    );
    filterHandler(
      { name: input.name, value: selectedPublisher, id: publisher?.id },
      true,
    );
  };

  const items = uniq(
    data?.search.items.flatMap((item) =>
      item.__typename === 'Organization' ? item.title : [],
    ),
  );

  publishers = offset ? uniq(concat(publishers, items)) : items;

  return (
    <Autocomplete
      multiSelectable
      label="Publisher"
      items={publishers ?? []}
      onSelect={onFilterSelect}
      selectedItems={selectedItems}
      placeHolder="Select Publishers"
      onFilterChange={onFilterTermChanged}
      searchPlaceholder="Type to filter Publisher"
      onLoadMoreItems={() => setOffset(offset + limit)}
    />
  );
};

export default PublisherFilter;
