import React, { FC, useState } from 'react';

import styled from 'styled-components';

import ArrowDown from '$application/assets/icons/arrow-down.svg';

export interface SectionProps {
  title: string;
  open?: boolean;
  children?: JSX.Element | JSX.Element[];
}

const Section: FC<SectionProps> = ({ title, children, open = false }) => {
  const [isOpen, setIsOpen] = useState<boolean>(open);

  return (
    <Container>
      <Header onClick={() => setIsOpen(!isOpen)}>
        <Title>{title}</Title>
        <Icon $isOpen={isOpen}>{isOpen ? <ArrowUp /> : <ArrowDown />}</Icon>
      </Header>
      {isOpen && <Container>{children}</Container>}
    </Container>
  );
};

export default Section;

const Container = styled.div`
  gap: 12px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  padding: 8px 0;
  font-size: 20px;
  cursor: pointer;
  font-weight: bold;
  color: ${({ theme }) => theme.text.contrast.secondary};
`;

const Title = styled.div`
  flex: 1;
`;

interface IconProps {
  $isOpen: boolean;
}

const Icon = styled.div<IconProps>`
  cursor: pointer;
  svg {
    width: 24px;
    height: 24px;
    use,
    path {
      fill: ${({ theme, $isOpen }) =>
        $isOpen ? theme.palette.grey[700] : theme.text.contrast.secondary};
    }
  }
`;

const ArrowUp = styled(ArrowDown)`
  transform: rotate(180deg);
`;
