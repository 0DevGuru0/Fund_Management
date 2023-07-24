import React from 'react';

import { StoryFC } from '$application/components/StoryFC';

import Separator, { SeparatorProps } from './Separator';

export default {
  title: 'Atoms / Markdown',
  component: Separator,
  parameters: {
    zeplinLink:
      'https://app.zeplin.io/project/60865602084a7012b372e417/screen/6180fe088b96f0bdb58fe811',
  },
};

export const HorizontalSeparator: StoryFC<SeparatorProps> = (args) => {
  return <Separator {...args} />;
};

HorizontalSeparator.args = {};
