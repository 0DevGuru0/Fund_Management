import React from 'react';

import styled from 'styled-components';

import { StoryFC } from '$application/components/StoryFC';

import { Search, SearchProps } from './Search';

export default {
  title: 'Molecules / Search',
  component: Search,
  parameters: {
    zeplinLink:
      'https://app.zeplin.io/project/60a1f710d2773f25c226fd39/screen/60ac8034bcea484b4e393b3b',
  },
};

export const Default: StoryFC<SearchProps> = (args) => {
  return (
    <Wrapper>
      <Search {...args} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

Default.args = {
  placeholder: 'Search By Title or Key ID',
  label: 'Search:',
};
