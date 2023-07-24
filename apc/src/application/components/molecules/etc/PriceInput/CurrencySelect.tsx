import React, { FC, useState } from 'react';

import styled from 'styled-components';

import ArrowSVG from '$application/assets/icons/chevron-down.svg';
import { Menu } from '$application/components/molecules/etc/Menu';
import { currencySymbol } from '$application/utils/currencySymbol';
import { Currency } from '$service/doaj/types/Currency';

interface CurrencySelectProps {
  disabled?: boolean;
  currencyList: string[];
  selectedCurrency: string;
  onSelect: (index: string) => void;
}

export const CurrencySelect: FC<CurrencySelectProps> = ({
  onSelect,
  currencyList,
  selectedCurrency,
  disabled = false,
}) => {
  const [hovered, setHovered] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Container onClick={() => !disabled && setShowMenu(!showMenu)}>
      <Selector
        $hovered={hovered}
        $disabled={disabled}
        $showMenu={showMenu}
        onMouseOver={() => !disabled && setHovered(true)}
        onMouseOut={() => !disabled && setHovered(false)}
      >
        <CurrencyLabel>
          {currencySymbol(
            Currency[
              Object.keys(Currency).find((key) => Currency[key] === selectedCurrency) ||
                ''
            ],
          )}
        </CurrencyLabel>
        <ArrowButton $showMenu={showMenu} />
      </Selector>
      <MenuContainer>
        {!disabled && showMenu && (
          <CustomMenu
            size="Small"
            items={currencyList}
            selectedItems={[selectedCurrency]}
            onSelect={(item) => onSelect(typeof item === 'string' ? item : item.label)}
          />
        )}
      </MenuContainer>
    </Container>
  );
};

export default CurrencySelect;

const Container = styled.div`
  z-index: 100;
  position: relative;
  width: max-content;
`;

interface ClickProps {
  $hovered: boolean;
  $disabled: boolean;
  $showMenu: boolean;
}

const Selector = styled.div<ClickProps>`
  padding: 6px;
  display: flex;
  font-weight: bold;
  padding-right: 3px;
  border-radius: 4px;
  color: ${({ theme, $disabled, $showMenu }) =>
    $disabled
      ? theme.palette.grey['500']
      : $showMenu
      ? theme.background.primary
      : theme.palette.grey['700']};
  background-color: ${({ theme, $disabled, $showMenu }) =>
    $disabled
      ? theme.palette.grey['200']
      : $showMenu
      ? theme.palette.grey['800']
      : theme.palette.grey['300']};
`;

const CurrencyLabel = styled.div`
  margin: auto 0;
`;

const MenuContainer = styled.div`
  float: right;
`;

const CustomMenu = styled(Menu)`
  right: 0;
  top: 28px;
  position: absolute;
`;

interface ArrowProps {
  $showMenu: boolean;
}

const ArrowButton = styled(ArrowSVG)<ArrowProps>`
  width: 16px;
  height: 16px;
  margin: auto 0 auto 6px;
  transform: rotateX(${({ $showMenu }) => ($showMenu ? -180 : 0)}deg);
  transition: transform 200ms;
  path,
  use {
    fill: ${({ theme, $showMenu }) =>
      $showMenu ? theme.background.primary : theme.palette.grey['700']};
  }
`;
