import React, { FC } from 'react';

import styled from 'styled-components';

import { ChannelsTypes } from '$application/components/pages/ManagementMessageTemplates/MessageTemplatesTable/channelTypes';

import { textToIcon } from './MessageTemplateChannels/TextToIcon';

export interface MessageTemplateChannelsProps {
  threshold?: number;
  channels: ChannelsTypes[];
}

export const MessageTemplateChannels: FC<MessageTemplateChannelsProps> = ({
  channels,
  threshold,
}) => {
  const channelList = threshold ? channels.slice(0, threshold) : channels;
  const remainHiddenChannelsCount = channels.length - (threshold ?? 0);

  return (
    <Container>
      {channelList.map((channel, key) => (
        <Circle key={key} title={channel}>
          {textToIcon(channel)}
        </Circle>
      ))}
      {threshold && remainHiddenChannelsCount > 0 && (
        <Circle title={channels.slice(threshold).join(', ')}>
          <Text>+{remainHiddenChannelsCount}</Text>
        </Circle>
      )}
    </Container>
  );
};

export default MessageTemplateChannels;

const Container = styled.div`
  display: flex;
`;

const Text = styled.div`
  margin: 1px;
`;

const Circle = styled.div`
  width: 18px;
  height: 18px;
  padding: 3px;
  margin-right: 6px;
  border-radius: 50%;
  color: ${({ theme }) => theme.palette.grey[700]};
  background-color: ${({ theme }) => theme.palette.grey[300]};
  > svg {
    margin: 1px;
    width: 16px;
    height: 16px;
    & path,
    & use {
      fill: ${({ theme }) => theme.palette.grey[700]};
    }
  }
`;
