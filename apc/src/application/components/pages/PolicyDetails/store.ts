import { atom } from 'jotai';

import { IFilter } from '$application/components/organisms/tables/Table/Filter/filterTypes';

export const voucherSortOptionAtom = atom('Created at');

export const voucherFilterOptionsAtom = atom<IFilter>({});

export const currentVoucherPageAtom = atom(1);
