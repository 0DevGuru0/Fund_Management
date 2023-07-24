import React from 'react';

import styled from 'styled-components';

import BackIcon from '$application/assets/icons/arrow-left.svg';
// import MoreHorizontal from '$application/assets/icons/more-horizontal.svg';

export interface PageTitleProps {
  children: string;
  onBack?: () => void;
  more?: React.ReactNode;
}

const PageTitle: React.FC<PageTitleProps> = ({ children, onBack }) => {
  return (
    <Container>
      <Button onClick={onBack}>
        <BackIcon />
      </Button>
      <Title>{children}</Title>
      {/* <Button>
        <MoreHorizontal />
      </Button> */}
    </Container>
  );
};

export default PageTitle;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  flex-grow: 1;
  color: ${({ theme }) => theme.text.contrast.secondary};
  padding: 12px;
`;

const Button = styled.div`
  width: 32px;
  height: 32px;
  margin: 0 12px 0 0;
  padding: 12px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.primaryLight};
  display: flex;
  align-items: center;
  justify-content: center;
  & > svg path,
  use {
    fill: ${({ theme }) => theme.text.contrast.primary};
  }
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.cmp.button.tertiary};
  }
`;
