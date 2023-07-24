import React from 'react';

import { StoryFC } from '$application/components/StoryFC';

import Typography, { TypographyProps } from './Typography';

export default {
  title: 'Atoms / Markdown',
  component: Typography,
  parameters: {
    zeplinLink:
      'https://app.zeplin.io/project/60865602084a7012b372e417/screen/6180fe088b96f0bdb58fe811',
  },
};

export const Paragraph: StoryFC<TypographyProps> = (args) => {
  return <Typography {...args} />;
};

Paragraph.args = {
  children:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
};
