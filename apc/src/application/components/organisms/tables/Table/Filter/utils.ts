import { compact, isEmpty, isNil, omit } from 'lodash';

import { isArrayOfString } from '$application/utils/isArrayOfString';

import { IFilter } from './filterTypes';

export interface FilterItem {
  name: string;
  value: any;
  id?: string;
}

export const filterModifier = (
  item: FilterItem,
  filters?: IFilter,
  canHaveMultipleValue: boolean = false,
): IFilter => {
  // Is the selected filter string or object
  const simpleFilter = !!item.id;

  if (isNil(filters) || isEmpty(filters)) {
    return {
      [item.name]: [!simpleFilter ? item.value : { id: item.id, value: item.value }],
    };
  }

  // Check if the current filter is available in filters
  const existedFilterGroup = filters[item.name];

  if (existedFilterGroup) {
    const valueExistsInGroup = isArrayOfString(existedFilterGroup)
      ? !!existedFilterGroup.find((filterGroup) => filterGroup === item.value)
      : !!existedFilterGroup.find((filterGroup) => filterGroup.value === item.value);

    const filteredItems = isArrayOfString(existedFilterGroup)
      ? existedFilterGroup.filter((filter) => filter !== item.value)
      : existedFilterGroup.filter((filter) => filter.value !== item.value);

    if (valueExistsInGroup) {
      return !isEmpty(filteredItems)
        ? { ...filters, [item.name]: filteredItems }
        : omit(filters, [item.name]);
    }

    return {
      ...filters,
      [item.name]: compact(
        [
          canHaveMultipleValue && [...filters[item.name]],
          !simpleFilter ? item.value : { id: item.id, value: item.value },
        ].flat(),
      ),
    };
  }

  return {
    ...filters,
    [item.name]: [!simpleFilter ? item.value : { id: item.id, value: item.value }],
  };
};
