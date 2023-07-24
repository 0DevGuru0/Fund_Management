import React from 'react';

import styled from 'styled-components';

import { StoryFC } from '$application/components/StoryFC';

import { Message, MessageProps, ServiceStatus } from './Message';

export default {
  title: 'Atoms / Message',
  component: Message,
};

export const Idle: StoryFC<MessageProps> = (args) => {
  return <Message {...args} />;
};

export const Error = Idle.bind({});
export const Success = Idle.bind({});
export const Loading = Idle.bind({});

const Item = styled.div`
  font-weight: bold;
  color: ${({ theme }) => theme.taskPalette.green};
`;

Idle.args = {
  status: ServiceStatus.Idle,
  message: 'Feeling Idle!',
};

Error.args = {
  status: ServiceStatus.Error,
  message: 'Error occurred',
};

Success.args = {
  status: ServiceStatus.Success,
  children: <Item>Success Message</Item>,
};

Loading.args = {
  status: ServiceStatus.Loading,
  message: 'Loading ...',
};

Idle.parameters = {
  zeplinLink: '',
};

Error.parameters = {
  zeplinLink: '',
};

Success.parameters = {
  zeplinLink: '',
};

Loading.parameters = {
  zeplinLink: '',
};
