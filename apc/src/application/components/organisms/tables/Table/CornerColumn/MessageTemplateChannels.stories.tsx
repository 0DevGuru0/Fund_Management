import React from 'react';

import styled from 'styled-components';

import { ChannelsTypes } from '$application/components/pages/ManagementMessageTemplates/MessageTemplatesTable/channelTypes';
import { StoryFC } from '$application/components/StoryFC';

import {
  MessageTemplateChannels,
  MessageTemplateChannelsProps,
} from './MessageTemplateChannels';

export default {
  title: 'Organisms / Table / MessageTemplateChannels',
  component: MessageTemplateChannels,
  parameters: {
    zeplinLink:
      'https://app.zeplin.io/project/60865602084a7012b372e417/screen/61122a7201e92716a14ac053',
  },
};

export const Simple: StoryFC<MessageTemplateChannelsProps> = (args) => {
  return (
    <Container>
      <MessageTemplateChannels {...args} />
    </Container>
  );
};

export const WithThreshold = Simple.bind({});

Simple.args = {
  channels: [ChannelsTypes.NOTIFICATION, ChannelsTypes.EMAIL, ChannelsTypes.SMS],
};

WithThreshold.args = {
  threshold: 3,
  channels: [
    ChannelsTypes.SMS,
    ChannelsTypes.EMAIL,
    ChannelsTypes.TEAMS,
    ChannelsTypes.TELEGRAM,
    ChannelsTypes.NOTIFICATION,
  ],
};

const Container = styled.div`
  padding: 24px 36px 24px 24px;
  background-color: ${({ theme }) => theme.background.primary};
  border: 1px ${({ theme }) => theme.background.secondary} solid;
`;
