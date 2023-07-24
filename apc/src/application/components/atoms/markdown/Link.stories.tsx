import React from 'react';

import { StoryFC } from '$application/components/StoryFC';

import Link, { LinkProps } from './Link';

export default {
  title: 'Atoms / Markdown',
  component: Link,
  parameters: {
    zeplinLink:
      'https://app.zeplin.io/project/60865602084a7012b372e417/screen/6180fe088b96f0bdb58fe811',
  },
};

export const TextLink: StoryFC<LinkProps> = (args) => {
  return <Link {...args} />;
};

TextLink.args = {
  children: 'Link',
  isExternal: true,
  href: 'https://www.google.com',
};
