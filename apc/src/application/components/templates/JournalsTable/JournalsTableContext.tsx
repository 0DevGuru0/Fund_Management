import { createContext } from 'react';

import { atom, PrimitiveAtom } from 'jotai';

import { IFilter } from '$application/components/organisms/tables/Table/Filter/filterTypes';

interface CommonJournalsContext {
  pageSize: number;
  hasError: boolean;
  isLoading: boolean;
  totalItems: number;
  sortOptionAtom: PrimitiveAtom<string>;
  currentPageAtom: PrimitiveAtom<number>;
  filterOptionsAtom: PrimitiveAtom<IFilter>;
  filterCardOpenAtom: PrimitiveAtom<boolean>;
}

export type IJournalsContextNonSelectable = CommonJournalsContext;

export interface IJournalsContextSelectable extends CommonJournalsContext {
  selectAllAtom: PrimitiveAtom<boolean>;
  selectedRowsAtom: PrimitiveAtom<Record<string, boolean>>;
}

const selectAllAtom = atom(false);
const filterCardOpenAtom = atom(false);

export const initJournalsContextSelectable: IJournalsContextSelectable = {
  pageSize: 10,
  totalItems: 0,
  selectAllAtom,
  hasError: false,
  isLoading: false,
  filterCardOpenAtom,
  currentPageAtom: atom(1),
  selectedRowsAtom: atom({}),
  filterOptionsAtom: atom({}),
  sortOptionAtom: atom('Title A-Z'),
};

export const initJournalsContextNonSelectable: IJournalsContextNonSelectable = {
  pageSize: 10,
  totalItems: 0,
  hasError: false,
  isLoading: false,
  filterCardOpenAtom,
  currentPageAtom: atom(1),
  filterOptionsAtom: atom({}),
  sortOptionAtom: atom('Title A-Z'),
};

export const JournalsContextSelectable = createContext(initJournalsContextSelectable);

export const JournalsContextNonSelectable = createContext(
  initJournalsContextNonSelectable,
);
