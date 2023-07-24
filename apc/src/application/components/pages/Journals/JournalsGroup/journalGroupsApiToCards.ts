import { JournalGroupCardProps } from '$application/components/molecules/cards/JournalGroupCard';
import type { TitlesMap } from '$application/components/templates/Policies/policyApiToPolicyTableItem';
import { GetJournalGroups200Item } from '$application/lib/generated/apcApi.schemas';

import CardLinkWrapper from './CardLinkWrapper';

// Converts a journal group item fetched from journalGroups API to supported type for JournalGroupCard
export const journalGroupsApiToCards = (
  data: GetJournalGroups200Item[],
  titlesMap: TitlesMap,
): JournalGroupCardProps[] => {
  return data.map((group) => {
    // TODO: temporary values should be provided by the getJournalGroups API
    return {
      id: group.id,
      label: 'Active', // temporary
      restricted: false, // temporary
      title: group.title,
      wrapper: CardLinkWrapper,
      journalsCount: group.journalsCount,
      createdAt: group.createdAt.toLocaleString(),
      publisher: titlesMap?.[group.publisherId]?.title ?? '-',
    };
  });
};
