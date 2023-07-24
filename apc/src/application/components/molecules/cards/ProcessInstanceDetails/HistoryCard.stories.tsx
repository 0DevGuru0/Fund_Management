import React from 'react';

import { action } from '@storybook/addon-actions';
import styled from 'styled-components';

import { StoryFC } from '$application/components/StoryFC';

import { HistoryCard, HistoryCardProps } from './HistoryCard';

export default {
  title: 'Molecules / Cards / ProcessInstanceDetails / HistoryCard',
  component: HistoryCard,
};

const zeplinLink =
  'https://app.zeplin.io/project/607d33693ea7778ad9c2fb17/screen/60d2d0181662da1664f4da83';

export const Active: StoryFC<Omit<HistoryCardProps, 'dueDate'>> = (args) => {
  return (
    <Container>
      <HistoryCard {...args} />
    </Container>
  );
};

Active.args = {
  id: '12345-67890',
  type: 'userTask',
  name: 'Sample Name',
  isDone: false,
  description: 'Waiting to complete the form',
  title: 'Request additional information for Oxford University',
  onCheckAndDo: action('onCheckAndDo'),
};

Active.parameters = {
  zeplinLink,
};

export const Done = Active.bind({});

Done.args = {
  id: '12345-67890',
  type: 'userTask',
  name: 'Sample Name',
  isDone: true,
  description: 'Creation article',
  title: 'Submitted  article by you',
  onPDFClick: () => action('onPDFClick'),
};

Done.parameters = {
  zeplinLink,
};

const Container = styled.div`
  padding: 64px 16px;
  background-color: ${({ theme }) => theme.palette.grey[200]};
`;
