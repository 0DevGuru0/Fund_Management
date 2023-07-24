import React, { useEffect } from 'react';

import { useAtomValue, useUpdateAtom } from 'jotai/utils';

import { Filter } from '$application/components/organisms/tables/Table/Filter';
import {
  FilterContext,
  IFilterContext,
  initFilterContext,
} from '$application/components/organisms/tables/Table/Filter/FilterContext';

import { currentPageAtom, filterOptionsAtom, filterCardOpenAtom } from '../store';

import { messageTemplatesFiltersConfig as config } from './config';

export const TableControl = () => {
  const filters = useAtomValue(filterOptionsAtom);
  const setCurrentPage = useUpdateAtom(currentPageAtom);

  useEffect(() => {
    const searchPhraseLength = filters?.searchPhrase?.length ?? 0;
    if (searchPhraseLength > 2 || searchPhraseLength === 0) {
      setCurrentPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const initContext: IFilterContext = {
    ...initFilterContext,
    config,
    filterCardOpenAtom,
    cardType: 'Bordered',
    variant: 'WithSortAndSelectAll',
    showSelectAll: true,
    filtersAtom: filterOptionsAtom,
    searchPlaceholder: 'Search on Body',
  };

  // TODO: [IW-605] Search should also be done on ID
  return (
    <FilterContext.Provider value={initContext}>
      <Filter />
    </FilterContext.Provider>
  );
};

export default TableControl;
