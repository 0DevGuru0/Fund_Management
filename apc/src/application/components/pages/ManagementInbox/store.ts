import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';

import { IFilter } from '$application/components/organisms/tables/Table/Filter/filterTypes';

export const currentPageAtom = atomWithReset<number>(1);

export const filterOptionsAtom = atomWithReset<IFilter>({});

export const filterCardOpenAtom = atom<boolean>(false);

export const selectedTasksAtom = atom<Record<string, boolean>>({});
