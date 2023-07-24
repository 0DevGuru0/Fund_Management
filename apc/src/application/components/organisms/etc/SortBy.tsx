import React, { FC, useState } from 'react';

import styled from 'styled-components';

import ArrowSVG from '$application/assets/icons/chevron-down.svg';
import SortByFilledSVG from '$application/assets/icons/sort-by-fill.svg';
import SortBySVG from '$application/assets/icons/sort-by.svg';
import { Menu } from '$application/components/molecules/etc/Menu';

export interface SortByProps {
  selectedOption: string;
  options: string[];
  onSelect: (index: string) => void;
}

export const SortBy: FC<SortByProps> = ({ selectedOption, options, onSelect }) => {
  const [hovered, setHovered] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Container onClick={() => setShowMenu(!showMenu)}>
      <SelectorContainer
        showMenu={showMenu}
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
      >
        <SortIconContainer>
          {hovered ? <SortByFilledSVG /> : <SortBySVG />}
        </SortIconContainer>
        <Text>
          Sort:
          <SelectedOptionContainer>{selectedOption}</SelectedOptionContainer>
        </Text>
        <ShowMenuButton showMenu={showMenu}>
          <ArrowSVG />
        </ShowMenuButton>
      </SelectorContainer>
      <MenuContainer>
        {showMenu && (
          <Menu
            size="Big"
            items={options}
            selectedItems={[selectedOption]}
            onSelect={onSelect}
          />
        )}
      </MenuContainer>
    </Container>
  );
};

interface ClickProps {
  showMenu: boolean;
}

const Container = styled.div`
  z-index: 999;
  position: relative;
  width: max-content;
`;

const SelectorContainer = styled.div<ClickProps>`
  display: flex;
  height: 24px;
  min-width: 140px;
  padding: 12px;
  border-radius: 8px;
  background-color: ${({ theme, showMenu }) =>
    showMenu ? theme.palette.primaryLight : theme.background.primary};
  border: 1px
    ${({ theme, showMenu }) => (showMenu ? theme.palette.primaryLight : theme.border)}
    solid;
  &:hover {
    border: 1px
      ${({ theme, showMenu }) =>
        showMenu ? theme.palette.primaryLight : theme.background.secondary}
      solid;
    background-color: ${({ theme, showMenu }) =>
      showMenu ? theme.palette.primaryLight : theme.background.secondary};
  }
`;

const SortIconContainer = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 6px;
  & > svg path,
  use {
    width: 20px;
    height: 20px;
    fill: ${({ theme }) => theme.text.lowContrast};
  }
`;

const Text = styled.div`
  display: flex;
  font-size: 16px;
  line-height: 20px;
  width: max-content;
  text-align: center;
  font-weight: normal;
  margin: auto 0;
  margin-right: 28px;
  color: ${({ theme }) => theme.link.text};
`;

const SelectedOptionContainer = styled.div`
  height: inherit;
  margin-left: 2px;
  font-weight: 600;
  color: ${({ theme }) => theme.text.hightContrast};
`;

const ShowMenuButton = styled.div<ClickProps>`
  position: absolute;
  right: 12px;
  top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  transform: rotateX(${({ showMenu }) => (showMenu ? -180 : 0)}deg);
  transition: transform 200ms;
  & > svg {
    width: inherit;
    height: inherit;
  }
  & > svg path {
    fill: ${({ theme }) => theme.border};
  }
  ${Container}:hover & > svg path {
    fill: ${({ theme }) => theme.link.text};
  }
`;

const MenuContainer = styled.div`
  float: right;
`;
