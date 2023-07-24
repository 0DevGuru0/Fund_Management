import { atomWithImmer } from 'jotai/immer';

import { Item } from '$application/components/molecules/etc/Menu';
import { AddPolicyBodyType } from '$application/lib/generated/apcApi.schemas';

interface FormData {
  title: string;
  terms: string;
  type: AddPolicyBodyType;
  funder?: Item;
  publisher?: Item;
  journals: Item[];
}

export const formDataInitial: FormData = {
  title: '',
  terms: '',
  type: 'VOUCHER',
  publisher: undefined,
  funder: undefined,
  journals: [],
};

export const formDataAtom = atomWithImmer<FormData>(formDataInitial);
