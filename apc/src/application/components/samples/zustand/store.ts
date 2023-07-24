// import { State } from 'zustand';
import produce from 'immer';

import { createStore } from './stateUtils';

export const counterStore = createStore((set: any, get: any) => ({
  count: 0,
  setCount: (newValue: number) => set(() => ({ count: newValue })),
}));

export const userStore = createStore((set) => ({
  users: [
    { name: 'Left', counter: 0 },
    { name: 'Right', counter: 0 },
  ],
  update: (fn) => set(produce(fn)),
}));
