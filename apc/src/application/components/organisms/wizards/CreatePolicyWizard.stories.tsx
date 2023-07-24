import React from 'react';

import { StoryFC } from '$application/components/StoryFC';

import { CreatePolicyWizard } from './CreatePolicyWizard';

export default {
  title: 'Organisms / Wizards / Create Policy',
  component: CreatePolicyWizard,
  parameters: { background: { noPadding: true } },
};

export const CreatePolicy: StoryFC = () => {
  return <CreatePolicyWizard open />;
};

CreatePolicy.parameters = {
  zeplinLink: [
    {
      name: '1. Policy Detail',
      link:
        'https://app.zeplin.io/project/60865602084a7012b372e417/screen/60dc5e2fecec2493a319c652',
    },
    {
      name: '1. Policy Detail (Voucher)',
      link:
        'https://app.zeplin.io/project/60865602084a7012b372e417/screen/60dc5e379cd3d409e860135c',
    },
    {
      name: '1. Policy Detail (Invoice)',
      link:
        'https://app.zeplin.io/project/60865602084a7012b372e417/screen/60dc5e3e886aee93be4798c3',
    },
    {
      name: '2. Preview',
      link:
        'https://app.zeplin.io/project/60865602084a7012b372e417/screen/60dc5e4e10a42193d1a7a0ca',
    },
    {
      name: '3. Success',
      link:
        'https://app.zeplin.io/project/60865602084a7012b372e417/screen/60dc5e53fc267f08ad600c42',
    },
  ],
};
