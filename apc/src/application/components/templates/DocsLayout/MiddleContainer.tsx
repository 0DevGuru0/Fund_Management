import React, { FC } from 'react';

import styled from 'styled-components';

import Questions from './MiddleContainer/Questions';

export interface MiddleContainerProps {
  title: string;
  description: string;
  children?: JSX.Element;
}

const MiddleContainer: FC<MiddleContainerProps> = ({ title, children, description }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Description>{description}</Description>
      {children}
      <Questions />
    </Container>
  );
};

export default MiddleContainer;

const Container = styled.div`
  flex: 1;
  padding: 0 36px;
  color: ${({ theme }) => theme.text.contrast.secondary};
`;

const Title = styled.div`
  font-size: 36px;
  font-weight: bold;
  line-height: 1.28;
  margin-bottom: 12px;
`;

const Description = styled.div`
  font-size: 16px;
  margin-bottom: 36px;
  color: ${({ theme }) => theme.palette.grey[800]};
`;
