import React from 'react';

import styled from 'styled-components';

import { StoryFC } from '$application/components/StoryFC';

import { CardWrapper, CardWrapperProps } from './CardWrapper';

export default {
  title: 'Molecules / Cards / ProcessInstanceDetails / CardWrapper',
  component: CardWrapper,
};

const zeplinLink =
  'https://app.zeplin.io/project/607d33693ea7778ad9c2fb17/screen/60d2d0181662da1664f4da83';

export const Active: StoryFC<CardWrapperProps> = (args) => {
  return (
    <Container>
      <CardWrapper {...args} />
    </Container>
  );
};

Active.args = {
  isActive: true,
};

Active.parameters = {
  zeplinLink,
};

export const Done = Active.bind({});

Done.args = {
  isActive: false,
};

Done.parameters = {
  zeplinLink,
};

const Container = styled.div`
  padding: 64px 16px;
  background-color: ${({ theme }) => theme.palette.grey[200]};
`;
