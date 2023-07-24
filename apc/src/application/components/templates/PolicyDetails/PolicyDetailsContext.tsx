import { createContext } from 'react';

import { atom, PrimitiveAtom } from 'jotai';

import { IFilter } from '$application/components/organisms/tables/Table/Filter/filterTypes';

export interface IPolicyDetailsContext {
  voucherSortOptionAtom: PrimitiveAtom<string>;
  voucherFilterOptionsAtom: PrimitiveAtom<IFilter>;
  currentVoucherPageAtom: PrimitiveAtom<number>;
  onVoucherClick?: (voucherId: string) => void;
}

export const initPolicyDetailsContext: IPolicyDetailsContext = {
  currentVoucherPageAtom: atom(1),
  voucherFilterOptionsAtom: atom({}),
  voucherSortOptionAtom: atom('Created at'),
  onVoucherClick: () => null,
};

export const PolicyDetailsContext = createContext(initPolicyDetailsContext);
