import React, { useContext, useEffect } from 'react';

import { useAtomValue, useUpdateAtom } from 'jotai/utils';

import { Filter } from '$application/components/organisms/tables/Table/Filter';
import {
  FilterContext,
  IFilterContext,
  initFilterContext,
} from '$application/components/organisms/tables/Table/Filter/FilterContext';

import { policiesFiltersConfig as config } from './config';
import { PoliciesContext } from './PoliciesContext';

const PoliciesTableControl = () => {
  const {
    sortOptionAtom,
    currentPageAtom,
    filterOptionsAtom,
    filterCardOpenAtom,
  } = useContext(PoliciesContext);

  const filters = useAtomValue(filterOptionsAtom);
  const setCurrentPage = useUpdateAtom(currentPageAtom);

  useEffect(() => {
    if (filters.searchPhrase) {
      setCurrentPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const initContext: IFilterContext = {
    ...initFilterContext,
    config,
    filterCardOpenAtom,
    variant: 'WithSort',
    sortByAtom: sortOptionAtom,
    sortOptions: ['Created at'],
    filtersAtom: filterOptionsAtom,
    searchPlaceholder: 'Search by Title',
  };

  return (
    <FilterContext.Provider value={initContext}>
      <Filter />
    </FilterContext.Provider>
  );
};

export default PoliciesTableControl;
