import { atom } from 'jotai';
import { atomWithImmer } from 'jotai/immer';

const counterAtom = atom(0);

const usersAtom = atomWithImmer([
  { name: 'Left', counter: 0 },
  { name: 'Right', counter: 0 },
]);

export { counterAtom, usersAtom };
