import { rest } from 'msw';

import { createServerAddress } from '$application/utils/createServerAddress';

import { EditProfileForm } from './EditProfileForm';

export default {
  title: 'Templates / Forms / EditProfileForm',
  component: EditProfileForm,
  parameters: {
    msw: [
      rest.get(createServerAddress('orcid/validate'), (_, res, ctx) =>
        res(ctx.delay(100), ctx.json({ isValid: false })),
      ),
    ],
    zeplinLink:
      'https://app.zeplin.io/project/607d33693ea7778ad9c2fb17/screen/60d2cfc2c21256109806704a',
  },
};

export const EditProfileFormCmp = EditProfileForm;
