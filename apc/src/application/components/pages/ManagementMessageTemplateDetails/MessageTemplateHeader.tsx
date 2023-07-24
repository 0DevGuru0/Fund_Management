import React, { FC } from 'react';

import styled from 'styled-components';

import MessageTemplateIcon from '$application/assets/icons/message-square-fill.svg';
import { taskToColor } from '$application/lib/taskToColor';

import InfoContainer from './MessageTemplateHeader/InfoContainer';
// import OptionsControl from './MessageTemplateHeader/InfoContainer/OptionsControl';

interface MessageTemplateHeaderProps {
  body: string;
  title: string;
  status: keyof typeof taskToColor;
}

export const MessageTemplateHeader: FC<MessageTemplateHeaderProps> = ({
  body,
  title,
  status,
}) => {
  return (
    <Container>
      <IconContainer>
        <MessageTemplateIcon />
      </IconContainer>
      <InfoContainer title={title} status={status} body={body} />
      {/* <OptionsControl /> */}
    </Container>
  );
};

export default MessageTemplateHeader;

const Container = styled.div`
  gap: 24px;
  display: flex;
  margin-top: 36px;
  flex-direction: row;
`;

const IconContainer = styled.div`
  width: 61px;
  height: 61px;
  padding: 23px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.background.secondary};
  & > svg {
    width: 60px;
    height: 60px;
    path,
    use {
      fill: ${({ theme }) => theme.palette.primary};
    }
  }
`;
