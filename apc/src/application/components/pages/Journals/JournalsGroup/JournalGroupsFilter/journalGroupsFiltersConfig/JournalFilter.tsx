import React, { FC, useState } from 'react';

import esb from 'elastic-builder';
import { isEmpty } from 'lodash';

import { Autocomplete } from '$application/components/organisms/inputs/Autocomplete';
import { RenderComponent } from '$application/components/organisms/tables/Table/Filter/filterTypes';
import { useGetJournalQuery } from '$application/lib/generated/repoGqlTypes';

const limit = 10;
const initQuery = esb.boolQuery().must(esb.matchQuery('schema', 'Journal'));

export const JournalFilter: FC<RenderComponent> = ({
  input,
  filterHandler,
  selectedItems,
}) => {
  const [offset, setOffset] = useState<number>(0);
  const [elasticQuery, setElasticQuery] = useState<esb.BoolQuery>(initQuery);

  const [{ data }] = useGetJournalQuery({
    pause: isEmpty(elasticQuery),
    variables: {
      limit,
      offset,
      query: elasticQuery,
    },
  });

  const JournalItems = data?.search.items?.flatMap((item) =>
    item.__typename === 'Journal' ? item : [],
  );

  const onFilterTermChanged = (searchTerm: string) => {
    // If the input is empty, all items should be show, otherwise only filtered
    let query;
    if (searchTerm) {
      query = esb
        .boolQuery()
        .must(esb.matchQuery('schema', 'Journal'))
        .must(esb.multiMatchQuery(['title^2', 'title.suggestion'], searchTerm));
    }
    setElasticQuery(query ?? initQuery);
  };

  const onFilterSelect = (selectedFilter) => {
    const journal =
      JournalItems &&
      JournalItems.find((item) => {
        return item.title === selectedFilter;
      });
    filterHandler({ name: input.name, value: selectedFilter, id: journal?._id }, true);
  };

  return (
    <Autocomplete
      label={input.label}
      placeHolder="Select Journals"
      selectedItems={selectedItems}
      onFilterChange={onFilterTermChanged}
      onSelect={(item) => onFilterSelect(item)}
      searchPlaceholder="Type to filter Journals"
      onLoadMoreItems={() => setOffset(offset + limit)}
      items={JournalItems ? JournalItems.map((item) => item.title) : []}
      disabled={input.disabled} // TODO: Currently, API does not send JournalNames
    />
  );
};

export default JournalFilter;
