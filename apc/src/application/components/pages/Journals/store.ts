import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';

import { IFilter } from '$application/components/organisms/tables/Table/Filter/filterTypes';

// Journals Modals
export const showCreateGroupAtom = atom<boolean>(false);
export const showAddJournalToGroupAtom = atom<boolean>(false);

// Journal Groups
export const filterOptionsAtom = atomWithReset<IFilter>({});
export const filterCardGroupsOpenAtom = atom<boolean>(false);
export const groupsSortOptionAtom = atom<string>('Most Recent');

// Journals Page
export const journalsCountAtom = atom<number>(0);

// Journals Tabs
export enum JournalsTabs {
  List = 'List',
  Groups = 'Groups',
}
export const activeJournalsTabAtom = atom<JournalsTabs>(JournalsTabs.List);
