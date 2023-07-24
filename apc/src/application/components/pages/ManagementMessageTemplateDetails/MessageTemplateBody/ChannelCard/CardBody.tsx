import React, { FC } from 'react';

import styled from 'styled-components';

import { GetMessageTemplates200MessageTemplatesItemChannelsItem } from '$application/lib/generated/apcApi.schemas';

interface CardBodyProps {
  channel: GetMessageTemplates200MessageTemplatesItemChannelsItem;
}

interface ChannelContent {
  title: string;
  value: string;
}

export const CardBody: FC<CardBodyProps> = ({ channel }) => {
  const cardItems: ChannelContent[] = [];

  if (channel.type === 'email') {
    cardItems.push(
      { title: 'Subject', value: channel.subject },
      { title: 'From', value: channel.from },
      { title: 'Cc', value: channel.cc?.join(', ') ?? '-' },
      { title: 'Bcc', value: channel.bcc?.join(', ') ?? '-' },
    );
  } else {
    cardItems.push({ title: 'Image Address', value: channel.image ?? '-' });
  }

  return (
    <Container>
      {cardItems.map((item, key) => {
        return (
          <div key={key}>
            <Title>{item.title}</Title>
            <Value>{item.value}</Value>
          </div>
        );
      })}
    </Container>
  );
};

export default CardBody;

const Container = styled.div`
  display: grid;
  padding-left: 48px;
  grid-row-gap: 24px;
  grid-column-gap: 12px;
  grid-template-columns: repeat(2, 1fr);
`;

const Title = styled.div`
  margin-bottom: 6px;
  color: ${({ theme }) => theme.palette.grey[800]};
`;

const Value = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.text.contrast.secondary};
`;
