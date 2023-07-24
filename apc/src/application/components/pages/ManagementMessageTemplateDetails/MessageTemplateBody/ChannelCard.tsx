import React, { FC } from 'react';

import styled from 'styled-components';

import { GetMessageTemplates200MessageTemplatesItemChannelsItem } from '$application/lib/generated/apcApi.schemas';

import CardBody from './ChannelCard/CardBody';
import CardHeader from './ChannelCard/CardHeader';

interface ChannelCardProps {
  channel: GetMessageTemplates200MessageTemplatesItemChannelsItem;
}

export const ChannelCard: FC<ChannelCardProps> = ({ channel }) => {
  return (
    <Card>
      <CardHeader cardType={channel.type} />
      <CardBody channel={channel} />
    </Card>
  );
};

export default ChannelCard;

const Card = styled.div`
  flex: 1;
  padding: 24px;
  border-radius: 12px;
  border: solid 1px ${({ theme }) => theme.border};
`;
