import create, { State } from 'zustand';
import { devtools } from 'zustand/middleware';

export const createStore = <T extends State>(
  args: (set: any, get?: any, api?: any) => T,
): any => create<T>(devtools<T>(args));
