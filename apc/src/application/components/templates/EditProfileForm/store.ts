import { atom } from 'jotai';
import { atomWithDefault } from 'jotai/utils';

import { userTokenAtom } from '$application/lib/auth/store';
import { ExtendedAffiliation } from '$service/auth/Token';

export const profileDataAtom = atomWithDefault((get) => get(userTokenAtom));
export const affiliationAtom = atom<ExtendedAffiliation>({
  id: '',
  label: 'Please select an affiliation',
});
