import { atom } from 'jotai';

import { Item } from '$application/components/molecules/etc/Menu';

export const selectedGroupAtom = atom<Item | undefined>(undefined);
