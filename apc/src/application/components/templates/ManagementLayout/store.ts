import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const isSidebarOpenAtom = atomWithStorage('sidebarStatus', true);
export const isDialogShownAtom = atom<boolean>(false);
