import React, { FC, useState } from 'react';

import esb from 'elastic-builder';
import { concat, flatten, isEmpty, uniq } from 'lodash';

import { Autocomplete } from '$application/components/organisms/inputs/Autocomplete';
import { RenderComponent } from '$application/components/organisms/tables/Table/Filter/filterTypes';
import { useGetSubjectsQuery } from '$application/lib/generated/repoGqlTypes';

const limitJournals = 10;
let subjects: string[] = [];
const initQuery = esb.boolQuery().must(esb.matchQuery('schema', 'Journal'));

export const SubjectFilter: FC<RenderComponent> = ({
  input,
  filterHandler,
  selectedItems,
}) => {
  const [offset, setOffset] = useState(0);
  const [elasticQuery, setElasticQuery] = useState<esb.BoolQuery>(initQuery);

  const [{ data }] = useGetSubjectsQuery({
    pause: isEmpty(elasticQuery),
    variables: {
      offset,
      limit: limitJournals,
      query: elasticQuery,
    },
  });

  const onFilterTermChanged = (newTerm: string) => {
    // If the input is empty, all items should be show, otherwise only filtered
    let query;
    if (newTerm) {
      query = esb
        .boolQuery()
        .must(esb.matchQuery('schema', 'Journal'))
        .must(
          esb
            .multiMatchQuery(['Journal.subjects^2', '*'], newTerm.toLocaleLowerCase())
            .fuzziness('AUTO')
            .minimumShouldMatch('90%'),
        );
    }
    setElasticQuery(query ?? initQuery);
  };

  const newSubjects = uniq(
    flatten(
      data?.search.items.flatMap((item) =>
        item.__typename === 'Journal' ? item.subjects : [],
      ),
    ),
  );

  subjects = offset ? uniq(concat(subjects, newSubjects)) : newSubjects;

  return (
    <Autocomplete
      label="Subject"
      multiSelectable
      items={subjects ?? []}
      placeHolder="Select Subjects"
      selectedItems={selectedItems}
      onFilterChange={onFilterTermChanged}
      searchPlaceholder="Type to filter subjects"
      onLoadMoreItems={() => setOffset(offset + limitJournals)}
      onSelect={(value) => filterHandler({ name: input.name, value }, true)}
    />
  );
};

export default SubjectFilter;
