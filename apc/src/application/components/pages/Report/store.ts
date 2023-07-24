import { atomWithImmer } from 'jotai/immer';

import { Item } from '$application/components/molecules/etc/Menu';

export interface FormData {
  funder: Item[];
  publisher: Item[];
  affiliation: Item[];
  policy: Item[];
  subject: Item[];
  startDate?: any;
  endDate?: any;
  status?: string;
  type?: string;
}
export const formDataInitial: FormData = {
  funder: [],
  publisher: [],
  affiliation: [],
  policy: [],
  subject: [],
  startDate: undefined,
  endDate: undefined,
  status: undefined,
  type: undefined,
};

export const formDataAtom = atomWithImmer<FormData>(formDataInitial);
