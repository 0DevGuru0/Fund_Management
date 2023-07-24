import { atom } from 'jotai';

import { IFilter } from '$application/components/organisms/tables/Table/Filter/filterTypes';

export const currentPageAtom = atom<number>(1);

export const filterOptionsAtom = atom<IFilter>({});

export const selectedTasksAtom = atom<Record<string, boolean>>({});
