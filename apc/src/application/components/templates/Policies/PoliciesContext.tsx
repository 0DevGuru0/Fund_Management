import { createContext } from 'react';

import { atom, PrimitiveAtom } from 'jotai';

import { IFilter } from '$application/components/organisms/tables/Table/Filter/filterTypes';

export interface IPoliciesContext {
  sortOptionAtom: PrimitiveAtom<string>;
  currentPageAtom: PrimitiveAtom<number>;
  filterOptionsAtom: PrimitiveAtom<IFilter>;
  filterCardOpenAtom: PrimitiveAtom<boolean>;
  onPolicyTableRowClick: (policyId: string) => void;
  showCreatePolicyWizardAtom: PrimitiveAtom<boolean>;
}

const filterCardOpenAtom = atom(false);
const showCreatePolicyWizardAtom = atom(false);

export const initPoliciesContext: IPoliciesContext = {
  filterCardOpenAtom,
  currentPageAtom: atom(1),
  showCreatePolicyWizardAtom,
  filterOptionsAtom: atom({}),
  onPolicyTableRowClick: () => null,
  sortOptionAtom: atom('Created at'),
};

export const PoliciesContext = createContext(initPoliciesContext);
