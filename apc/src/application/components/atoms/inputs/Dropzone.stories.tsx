import React from 'react';

import { StoryFC } from '$application/components/StoryFC';

import { Dropzone, DropzoneProps } from './Dropzone';

export default {
  title: 'Atoms / Controls / Dropzone',
  component: Dropzone,
  parameters: {
    zeplinLink:
      'https://app.zeplin.io/project/60865602084a7012b372e417/screen/60dc5ea1b4aba60725b89146',
  },
};

export const Default: StoryFC<DropzoneProps> = (args) => {
  return <Dropzone {...args} />;
};

Default.args = {
  accept: 'text/csv',
  maxFiles: 1,
};
