import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';

import { IFilter } from '$application/components/organisms/tables/Table/Filter/filterTypes';

export const policiesSortOptionAtom = atom('Created at');

export const policiesFilterOptionsAtom = atomWithReset<IFilter>({});

export const currentPageAtom = atomWithReset(1);

export const filterCardOpenAtom = atom<boolean>(false);

export const showCreatePolicyWizardAtom = atom(false);
