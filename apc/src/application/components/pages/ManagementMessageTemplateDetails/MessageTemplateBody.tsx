import React, { FC } from 'react';

import dayjs from 'dayjs';
import styled from 'styled-components';

import { GetMessageTemplates200MessageTemplatesItemChannelsItem } from '$application/lib/generated/apcApi.schemas';

import ChannelCard from './MessageTemplateBody/ChannelCard';

interface MessageTemplateBodyProps {
  createdAt: Date | string;
  channels: GetMessageTemplates200MessageTemplatesItemChannelsItem[];
}

export const MessageTemplateBody: FC<MessageTemplateBodyProps> = ({
  channels,
  createdAt,
}) => {
  return (
    <Container>
      <Cards>
        {channels.map((channel, key) => {
          return <ChannelCard key={key} channel={channel} />;
        })}
      </Cards>
      <CreatedAt>
        Created At:
        <DateContainer>{dayjs(createdAt).format('DD MMM YYYY')}</DateContainer>
      </CreatedAt>
    </Container>
  );
};

export default MessageTemplateBody;

const iconSize = 107;
const Container = styled.div`
  gap: 24px;
  display: flex;
  flex-direction: row;
  padding: 36px 0 0 calc(${iconSize}px + 24px);
`;

const Cards = styled.div`
  flex: 1;
  gap: 24px;
  display: flex;
  flex-direction: column;
`;

const CreatedAt = styled.div`
  width: 166px;
  padding: 36px;
  max-height: 50px;
  border-radius: 12px;
  color: ${({ theme }) => theme.palette.grey[800]};
  background-color: ${({ theme }) => theme.palette.grey[400]};
`;

const DateContainer = styled.div`
  font-size: 16px;
  margin-top: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.text.contrast.secondary};
`;
