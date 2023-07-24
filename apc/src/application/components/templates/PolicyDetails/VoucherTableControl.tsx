import React, { useContext, useEffect } from 'react';

import { useAtomValue, useUpdateAtom } from 'jotai/utils';

import { Filter } from '$application/components/organisms/tables/Table/Filter';
import {
  IFilterContext,
  FilterContext,
  initFilterContext,
} from '$application/components/organisms/tables/Table/Filter/FilterContext';
import { currentVoucherPageAtom } from '$application/components/pages/PolicyDetails/store';

import { voucherFiltersConfig } from './config';
import { PolicyDetailsContext } from './PolicyDetailsContext';
import { filterCardOpenAtom } from './store';

const VoucherTableControl = () => {
  const { voucherSortOptionAtom, voucherFilterOptionsAtom } = useContext(
    PolicyDetailsContext,
  );

  const sortOption = useAtomValue(voucherSortOptionAtom);
  const filters = useAtomValue(voucherFilterOptionsAtom);
  const setCurrentVoucherPage = useUpdateAtom(currentVoucherPageAtom);

  useEffect(() => {
    setCurrentVoucherPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const initContext: IFilterContext = {
    ...initFilterContext,
    filterCardOpenAtom,
    variant: 'WithSort',
    sortOptions: [sortOption],
    config: voucherFiltersConfig,
    sortByAtom: voucherSortOptionAtom,
    searchPlaceholder: 'Search by Code',
    filtersAtom: voucherFilterOptionsAtom,
  };

  return (
    <FilterContext.Provider value={initContext}>
      <Filter />
    </FilterContext.Provider>
  );
};

export default VoucherTableControl;
