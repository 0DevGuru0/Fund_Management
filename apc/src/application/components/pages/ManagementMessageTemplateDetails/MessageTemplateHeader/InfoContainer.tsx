import React, { FC } from 'react';

import styled from 'styled-components';

import { taskToColor } from '$application/lib/taskToColor';

interface InfoContainerProps {
  body: string;
  title: string;
  status: keyof typeof taskToColor;
}

export const InfoContainer: FC<InfoContainerProps> = ({ title, status, body }) => {
  return (
    <Container>
      <Title>
        <span>{title}</span>
        <Status $backgroundColor={taskToColor[status]}>{status}</Status>
      </Title>
      <HeadText>Body</HeadText>
      <BodyText>{body}</BodyText>
    </Container>
  );
};

export default InfoContainer;

const Container = styled.div`
  flex: 1;
`;

const Title = styled.div`
  gap: 12px;
  display: flex;
  font-size: 20px;
  line-height: 24px;
  font-weight: bold;
  margin-right: 12px;
  align-items: center;
  color: ${({ theme }) => theme.text.contrast.secondary};
`;

interface StatusProps {
  $backgroundColor: string;
}

const Status = styled.span<StatusProps>`
  font-size: 14px;
  padding: 3px 12px;
  font-weight: bold;
  line-height: 18px;
  width: max-content;
  border-radius: 4px;
  display: inline-block;
  color: ${({ theme }) => theme.background.primary};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
`;

const HeadText = styled.div`
  margin-top: 12px;
  margin-bottom: 15px;
`;

const BodyText = styled.div`
  display: flex;
  font-size: 16px;
  color: ${({ theme }) => theme.text.contrast.secondary};
`;
