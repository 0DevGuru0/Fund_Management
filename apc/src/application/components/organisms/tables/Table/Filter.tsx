import React, { FC, useContext } from 'react';

import clsx from 'classnames';
import { useAtomValue } from 'jotai/utils';

import { FilterCard } from './Filter/FilterCard';
import { FilterContext } from './Filter/FilterContext';
import FilterHeader from './Filter/FilterHeader';

export interface FilterProps {
  className?: string;
}

export const Filter: FC<FilterProps> = ({ className }) => {
  const { filterCardOpenAtom } = useContext(FilterContext);

  const isFilterCardOpen = useAtomValue(filterCardOpenAtom);

  return (
    <div className={clsx('tableFilter', className)}>
      <FilterHeader />
      {isFilterCardOpen && <FilterCard />}
    </div>
  );
};
