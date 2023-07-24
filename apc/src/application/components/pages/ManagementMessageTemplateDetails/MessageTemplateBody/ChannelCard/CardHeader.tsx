import React, { FC } from 'react';

import { capitalize } from 'lodash';
import styled from 'styled-components';

// import ChannelControl from './CardHeader/ChannelControl';
import { textToIcon } from './CardHeader/TextToIcon';

interface CardHeaderProps {
  cardType: string;
}

export const CardHeader: FC<CardHeaderProps> = ({ cardType }) => {
  return (
    <Container>
      <IconContainer>{textToIcon(cardType)}</IconContainer>
      <TitleContainer>{capitalize(cardType)}</TitleContainer>
      {/* <ChannelControl channelName={cardType} /> */}
    </Container>
  );
};

export default CardHeader;

const Container = styled.div`
  gap: 12px;
  display: flex;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.text.contrast.secondary};
`;

const IconContainer = styled.div`
  width: 24px;
  height: 24px;
  padding: 6px;
  display: flex;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.grey[200]};
  & > svg path,
  use {
    width: 24px;
    height: 24px;
    fill: ${({ theme }) => theme.palette.grey[700]};
  }
`;

const TitleContainer = styled.div`
  flex: 1;
  margin: auto 0;
`;
