import { atomWithImmer } from 'jotai/immer';

import { UpsertMessageTemplateBody } from '$application/lib/generated/apcApi.schemas';

export type FormType =
  | 'Email'
  | 'SMS'
  | 'Notification'
  | 'Telegram'
  | 'Whatsapp'
  | 'Teams'
  | 'HTTPS';

export const formDataAtom = atomWithImmer<UpsertMessageTemplateBody>({
  templateId: '',
  channels: [],
  body: '',
});
