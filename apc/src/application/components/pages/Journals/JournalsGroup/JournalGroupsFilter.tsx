import React from 'react';

import { Filter } from '$application/components/organisms/tables/Table/Filter';
import {
  FilterContext,
  IFilterContext,
  initFilterContext,
} from '$application/components/organisms/tables/Table/Filter/FilterContext';
import {
  filterOptionsAtom,
  groupsSortOptionAtom,
  filterCardGroupsOpenAtom as filterCardOpenAtom,
} from '$application/components/pages/Journals/store';

import { journalGroupsFiltersConfig } from './JournalGroupsFilter/journalGroupsFiltersConfig';

export enum SortOptions {
  'Most Recent' = 'Most Recent',
  'Group Title A-Z' = 'Group Title A-Z',
  'Group Title Z-A' = 'Group Title Z-A',
  'Number of Journals Asc' = 'Number of Journals Asc',
  'Number of Journals Desc' = 'Number of Journals Desc',
}

const JournalGroupsFilter = () => {
  const initContext: IFilterContext = {
    ...initFilterContext,
    filterCardOpenAtom,
    variant: 'WithSort',
    filtersAtom: filterOptionsAtom,
    sortByAtom: groupsSortOptionAtom,
    config: journalGroupsFiltersConfig,
    sortOptions: Object.keys(SortOptions),
    searchPlaceholder: 'Search by Group Title',
  };

  return (
    <FilterContext.Provider value={initContext}>
      <Filter />
    </FilterContext.Provider>
  );
};

export default JournalGroupsFilter;
