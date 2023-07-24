/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useContext, useEffect } from 'react';

import { useAtomValue, useUpdateAtom } from 'jotai/utils';

import { Filter } from '$application/components/organisms/tables/Table/Filter';
import {
  FilterContext,
  IFilterContext,
  initFilterContext,
} from '$application/components/organisms/tables/Table/Filter/FilterContext';
import { FilterConfig } from '$application/components/organisms/tables/Table/Filter/filterTypes';

import { JournalsContextSelectable } from './JournalsTableContext';

interface JournalsTableControlProps {
  tableItems: any[];
  config: FilterConfig;
  showSelectAll?: boolean;
}

const JournalsTableControl: FC<JournalsTableControlProps> = ({
  config,
  tableItems,
  showSelectAll = false,
}) => {
  const {
    selectAllAtom,
    sortOptionAtom,
    currentPageAtom,
    selectedRowsAtom,
    filterOptionsAtom,
    filterCardOpenAtom,
  } = useContext(JournalsContextSelectable);

  const selectAll = useAtomValue(selectAllAtom);
  const filters = useAtomValue(filterOptionsAtom);
  const setCurrentPage = useUpdateAtom(currentPageAtom);
  const setSelectedRows = useUpdateAtom(selectedRowsAtom);

  useEffect(() => {
    if (!selectAll) {
      setSelectedRows({});
    } else {
      const updatedTableItems = tableItems.reduce(
        (acc, curr) => ({ ...acc, [curr.title.id]: true }),
        {},
      );
      setSelectedRows(updatedTableItems);
    }
  }, [selectAll]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const initContext: IFilterContext = {
    ...initFilterContext,
    config,
    showSelectAll,
    filterCardOpenAtom,
    sortOptions: ['Title A-Z'],
    sortByAtom: sortOptionAtom,
    filtersAtom: filterOptionsAtom,
    variant: 'Default',
    selectAllCheckedAtom: selectAllAtom,
    searchPlaceholder: 'Search by Title, ISSN, or E-ISSN',
  };

  return (
    <FilterContext.Provider value={initContext}>
      <Filter />
    </FilterContext.Provider>
  );
};

export default JournalsTableControl;
