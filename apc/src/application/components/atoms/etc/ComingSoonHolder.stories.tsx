import React from 'react';

import { Button } from '$application/components/atoms/buttons/Button';
import { StoryFC } from '$application/components/StoryFC';

import { ComingSoonHolder, ComingSoonHolderProps } from './ComingSoonHolder';

export default {
  title: 'Molecules / CommingSoonHolder',
  component: ComingSoonHolder,
};

export const DefaultComingSoon: StoryFC<ComingSoonHolderProps> = (args) => {
  return <ComingSoonHolder {...args} />;
};

DefaultComingSoon.args = {
  description:
    'This section will be added to the platform soon, and in this section you can see the list of payments and financial records that are done on this platform.',
  actionButton: (
    <Button title="Notify Me" color="default" customSize="lg" variant="contained" />
  ),
};

DefaultComingSoon.parameters = {
  zeplinLink:
    'https://app.zeplin.io/project/60865602084a7012b372e417/screen/610a466c28de6701936c6a79',
};
