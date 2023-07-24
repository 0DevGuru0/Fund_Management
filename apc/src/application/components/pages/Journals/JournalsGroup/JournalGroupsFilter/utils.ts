import { filter, includes, isEmpty, lowerCase, orderBy } from 'lodash';

import { JournalGroupCardProps } from '$application/components/molecules/cards/JournalGroupCard';
import { IFilter } from '$application/components/organisms/tables/Table/Filter/filterTypes';

import { SortOptions } from '../JournalGroupsFilter';

export const filteredDataProcess = (
  sortOption: string,
  filterOptions: IFilter,
  journalGroups: JournalGroupCardProps[],
): JournalGroupCardProps[] => {
  // TODO: Sort and Filter should be handled by Elasticsearch after providing proper API variables
  if (isEmpty(filterOptions) && isEmpty(sortOption)) {
    return journalGroups;
  }

  let filteredGroups = journalGroups;

  // Fetching filter values
  const titleFilter = filterOptions.searchPhrase;
  const checkboxFilters = filterOptions.states as string[];

  // Applying filters
  if (!isEmpty(titleFilter)) {
    filteredGroups = filter(filteredGroups, (group) =>
      includes(lowerCase(group.title), lowerCase(titleFilter)),
    );
  }
  if (!isEmpty(checkboxFilters)) {
    filteredGroups = filter(filteredGroups, (group) =>
      checkboxFilters.includes('Active')
        ? group.label === 'Active'
        : checkboxFilters.includes('Suspended')
        ? group.label === 'Suspended'
        : checkboxFilters.includes('Only Restricted') && group.restricted === true,
    );
  }

  // Sorting
  switch (sortOption) {
    case SortOptions['Group Title A-Z']:
      filteredGroups = orderBy(filteredGroups, ['title'], ['asc']);
      break;
    case SortOptions['Group Title Z-A']:
      filteredGroups = orderBy(filteredGroups, ['title'], ['desc']);
      break;
    case SortOptions['Number of Journals Asc']:
      filteredGroups = orderBy(filteredGroups, ['journalsCount'], ['asc']);
      break;
    case SortOptions['Number of Journals Desc']:
      filteredGroups = orderBy(filteredGroups, ['journalsCount'], ['desc']);
      break;
    default:
      filteredGroups = orderBy(filteredGroups, ({ createdAt }) => new Date(createdAt), [
        'desc',
      ]);
      break;
  }

  return filteredGroups;
};
