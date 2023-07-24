import React from 'react';

import { StoryFC } from '$application/components/StoryFC';

import { ImportPolicyVouchersWizard } from './ImportPolicyVouchersWizard';

export default {
  title: 'Organisms / Wizards / Import Policy Vouchers',
  component: ImportPolicyVouchersWizard,
  parameters: { background: { noPadding: true } },
};

export const CreatePolicy: StoryFC = () => {
  return (
    <>
      <ImportPolicyVouchersWizard open={true} />
    </>
  );
};

CreatePolicy.parameters = {
  zeplinLink: [
    {
      name: '1. Policy',
      link:
        'https://app.zeplin.io/project/60865602084a7012b372e417/screen/60dc5ea1b4aba60725b89146',
    },
    {
      name: '1. Policy (filled)',
      link:
        'https://app.zeplin.io/project/60865602084a7012b372e417/screen/60dc5ea8dc67190693291e08',
    },
    {
      name: '2. Preview',
      link:
        'https://app.zeplin.io/project/60865602084a7012b372e417/screen/60dc5eae18a5b106feb87b14',
    },
    {
      name: '3. Success',
      link:
        'https://app.zeplin.io/project/60865602084a7012b372e417/screen/60dc5eb40dcd3108bda350f5',
    },
  ],
};
