import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';

import { IFilter } from '$application/components/organisms/tables/Table/Filter/filterTypes';

interface IMessageTemplate {
  openWizard: boolean;
  openDeleteModal: boolean;
  messageId?: string;
}
export const currentPageAtom = atomWithReset<number>(1);
export const filterOptionsAtom = atomWithReset<IFilter>({});
export const filterCardOpenAtom = atom<boolean>(false);
export const showSelectAllAtom = atom<boolean>(true);
export const selectAllAtom = atom<boolean>(false);
export const selectedRowsAtom = atom<string[]>([]);
export const sortOptionAtom = atom<string>('Title A-Z');
export const messageTemplateWizard = atom<IMessageTemplate>({
  openWizard: false,
  openDeleteModal: false,
});
