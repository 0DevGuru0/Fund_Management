import React, { FC, ReactNode } from 'react';

import styled from 'styled-components';

export interface EmptyContentHolderProps {
  title: string;
  icon: ReactNode;
  description: string;
  actionButton?: ReactNode;
}

export const EmptyContentHolder: FC<EmptyContentHolderProps> = ({
  title,
  description,
  icon,
  actionButton,
}) => {
  return (
    <Container>
      {icon}
      <Title>{title}</Title>
      <Description>{description}</Description>
      {actionButton}
    </Container>
  );
};

export default EmptyContentHolder;

const Container = styled.div`
  text-align: center;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  line-height: 25px;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.taskPalette.grey};
`;

const Description = styled.div`
  font-size: 16px;
  max-width: 600px;
  margin: 0 auto 24px auto;
`;
