import React from 'react';

import styled from 'styled-components';

import { StoryFC } from '$application/components/StoryFC';

import Tags, { TagsProps } from './Tags';

export default {
  title: 'Atoms / Navigation',
  component: Tags,
  parameters: {
    zeplinLink:
      'https://app.zeplin.io/project/60865602084a7012b372e417/screen/6180fdc9461098bb47d80d1f',
  },
};

export const TagsCmp: StoryFC<TagsProps> = (args) => {
  return (
    <Wrapper>
      <Tags {...args} onClick={args.onClick} />
    </Wrapper>
  );
};

TagsCmp.args = {
  tags: ['Authorization', 'SSO', 'Account', 'Security'],
};

const Wrapper = styled.div`
  width: 226px;
`;
