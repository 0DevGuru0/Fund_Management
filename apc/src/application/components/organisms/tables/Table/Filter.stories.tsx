import React, { useContext } from 'react';

import { atom } from 'jotai';

import { StoryFC } from '$application/components/StoryFC';
import { journalsFiltersConfig } from '$application/components/templates/JournalsTable/JournalsTableControl/journalsFiltersConfig';
import { voucherFiltersConfig } from '$application/components/templates/PolicyDetails/config';

import { Filter, FilterProps } from './Filter';
import { sampleFilterConfig, toggleItems } from './Filter/filterConfig';
import { FilterContext, IFilterContext, initFilterContext } from './Filter/FilterContext';
import { IFilter } from './Filter/filterTypes';
import { filterCardOpenAtom } from './Filter/store';

export default {
  title: 'Organisms / Table / Filter',
  component: Filter,
  parameters: {
    zeplinLink: [
      {
        name: 'Default',
        link:
          'https://app.zeplin.io/project/60865602084a7012b372e417/screen/60d2ca6b1a0da6115a8376e3',
      },
      {
        name: 'With SelectAll',
        link:
          'https://app.zeplin.io/project/60865602084a7012b372e417/screen/60e1a443b2dcd410f85fe3e6',
      },
      {
        name: 'With Toggle',
        link:
          'https://app.zeplin.io/project/60865602084a7012b372e417/screen/61122a66501c2f1323e8b25c',
      },
      {
        name: 'With Toggle and View Changer',
        link:
          'https://app.zeplin.io/project/60865602084a7012b372e417/screen/6087d7017d906d115cd880eb',
      },
    ],
  },
};

type ExtendedFilterProps = FilterProps &
  Pick<IFilterContext, 'config' | 'variant'> & {
    withBadge: boolean;
  };

const initContext: IFilterContext = {
  ...initFilterContext,
  filterCardOpenAtom,
};

export const Default: StoryFC<ExtendedFilterProps> = (args) => {
  const { filtersAtom } = useContext(FilterContext);
  const fakeBadgeValue: IFilter = { states: ['sample'] };

  const contextValue = {
    ...initContext,
    toggleItems,
    config: args.config,
    showSelectAll: true,
    variant: args.variant,
    filtersAtom: args.withBadge ? atom(fakeBadgeValue) : filtersAtom,
  };

  return (
    <FilterContext.Provider value={contextValue}>
      <Filter />
    </FilterContext.Provider>
  );
};

export const WithSort = Default.bind({});
export const WithSortAndToggle = Default.bind({});
export const WithSortAndSelectAll = Default.bind({});
export const SearchAndSortAndToggle = Default.bind({});

Default.args = {
  withBadge: true,
  variant: 'Default',
  config: sampleFilterConfig,
};

WithSort.args = {
  withBadge: false,
  variant: 'WithSort',
  config: journalsFiltersConfig,
};

WithSortAndSelectAll.args = {
  withBadge: false,
  config: voucherFiltersConfig,
  variant: 'WithSortAndSelectAll',
};

WithSortAndToggle.args = {
  withBadge: false,
  config: sampleFilterConfig,
  variant: 'WithSortAndToggle',
};

SearchAndSortAndToggle.args = {
  withBadge: false,
  config: voucherFiltersConfig,
  variant: 'SearchAndSortAndToggle',
};
