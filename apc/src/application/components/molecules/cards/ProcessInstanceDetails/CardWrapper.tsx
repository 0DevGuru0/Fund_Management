import React, { FC } from 'react';

import styled from 'styled-components';

export interface CardWrapperProps {
  isActive: boolean;
}

export const CardWrapper: FC<CardWrapperProps> = ({ isActive, children }) => {
  return (
    <Container>
      <Line />
      <Bullet isActive={isActive} />
      <ChildrenContainer>{children}</ChildrenContainer>
    </Container>
  );
};

export default CardWrapperProps;

const Container = styled.div`
  display: flex;
  height: 136px;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
`;

const Line = styled.div`
  width: 2px;
  height: 100%;
  margin-left: 16px;
  background-color: ${({ theme }) => theme.palette.grey[500]};
`;

interface BulletProps {
  isActive: boolean;
}

const Bullet = styled.div<BulletProps>`
  width: 16px;
  height: 16px;
  border: 3px solid ${({ theme }) => theme.palette.grey[200]};
  border-radius: 50%;
  transform: translate(-9px, 16px);
  box-sizing: border-box;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.cmp.historyCard.done.solid : theme.palette.grey[700]};
`;

const ChildrenContainer = styled.div`
  margin-top: 24px;
  flex-grow: 1;
`;
