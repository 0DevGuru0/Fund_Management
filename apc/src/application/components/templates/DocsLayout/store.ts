import { atom } from 'jotai';

import { Help } from './LeftContainer/Item';

export const helpAtom = atom<Help | undefined>(undefined);
export const searchAtom = atom<string>('');
