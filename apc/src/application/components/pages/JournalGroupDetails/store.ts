import { atom } from 'jotai';

import { IFilter } from '$application/components/organisms/tables/Table/Filter/filterTypes';

// Journals Table
export const currentPageAtom = atom<number>(1);
export const journalsCountAtom = atom<number>(0);
export const filterOptionsAtom = atom<IFilter>({});
export const filterCardOpenAtom = atom<boolean>(false);
export const sortOptionAtom = atom<string>('Title A-Z');
