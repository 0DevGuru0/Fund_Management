import { atom } from 'jotai';
import { atomWithImmer } from 'jotai/immer';

import { Item } from '$application/components/molecules/etc/Menu';
import { AddVouchersToPolicyBodyVouchersItem } from '$application/lib/generated/apcApi.schemas';

interface FormData {
  policy?: Item;
  publisher?: Item;
  vouchers: AddVouchersToPolicyBodyVouchersItem[];
}

export const formDataInitial: FormData = {
  policy: undefined,
  publisher: undefined,
  vouchers: [],
};

export const formDataAtom = atomWithImmer<FormData>(formDataInitial);
export const errorAtom = atom<string>('');
