import esb from 'elastic-builder';
import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';

import { IFilter } from '$application/components/organisms/tables/Table/Filter/filterTypes';

export interface QueryVariablesProps {
  query: Record<string, any>;
  sort?: Record<string, Record<string, string>>[];
}

// Journals Table
export const currentPageAtom = atom<number>(1);
export const selectAllAtom = atom<boolean>(false);
export const filterOptionsAtom = atom<IFilter>({});
export const filterCardOpenAtom = atom<boolean>(false);
export const sortOptionAtom = atom<string>('Title A-Z');
export const selectedRowsAtom = atom<Record<string, boolean>>({});
export const queryVariablesAtom = atomWithReset<QueryVariablesProps>({
  sort: [],
  query: esb.boolQuery().must(esb.matchQuery('schema', 'Journal')),
});
