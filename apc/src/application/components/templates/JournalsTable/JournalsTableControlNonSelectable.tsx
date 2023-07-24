import React, { FC, useContext, useEffect } from 'react';

import { useAtomValue, useUpdateAtom } from 'jotai/utils';

import { Filter } from '$application/components/organisms/tables/Table/Filter';
import {
  FilterContext,
  IFilterContext,
  initFilterContext,
} from '$application/components/organisms/tables/Table/Filter/FilterContext';
import { FilterConfig } from '$application/components/organisms/tables/Table/Filter/filterTypes';

import { JournalsContextNonSelectable } from './JournalsTableContext';

interface JournalsTableControlNonSelectableProps {
  config: FilterConfig;
}

const JournalsTableControlNonSelectable: FC<JournalsTableControlNonSelectableProps> = ({
  config,
}) => {
  const { currentPageAtom, filterOptionsAtom, filterCardOpenAtom } = useContext(
    JournalsContextNonSelectable,
  );

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
    variant: 'SearchOnly',
    filtersAtom: filterOptionsAtom,
    searchPlaceholder: 'Search by Title',
  };

  // TODO: Filter items is temporarily set to 'Search' instead of 'WithSort' until the API covers all filters
  return (
    <FilterContext.Provider value={initContext}>
      <Filter />
    </FilterContext.Provider>
  );
};

export default JournalsTableControlNonSelectable;
