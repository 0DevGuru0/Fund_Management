import React, { useContext } from 'react';

import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai/utils';
import styled from 'styled-components';

import CloseSVG from '$application/assets/icons/close.svg';
import FilterSVG from '$application/assets/icons/filter.svg';

import { FilterContext } from '../FilterContext';

import { omit } from '$utils';

export const FilterButton = () => {
  const { filterCardOpenAtom, buttonType, showToggleAtom, filtersAtom } = useContext(
    FilterContext,
  );

  const filters = useAtomValue(filtersAtom);
  const showToggle = useAtomValue(showToggleAtom);
  const [isButtonOpen, setFilterCardOpen] = useAtom(filterCardOpenAtom);

  const clickHandler = () => {
    setFilterCardOpen((prev) => !prev);
  };

  // Note: do not show badge for searchPhrase and toggle filters
  const filtersCount = filters
    ? Object.values(
        omit(filters, showToggle ? ['searchPhrase', 'toggle'] : ['searchPhrase']),
      ).length
    : 0;

  return (
    <Container $isOpen={isButtonOpen} $variant={buttonType} onClick={clickHandler}>
      {isButtonOpen ? <CloseIcon /> : <FilterIcon />}
      <Text>{isButtonOpen ? 'Close Filter' : 'Filter'}</Text>
      {filtersCount > 0 && !isButtonOpen && <Badge>{filtersCount}</Badge>}
    </Container>
  );
};

interface ButtonProps {
  $isOpen: boolean;
  $variant: 'White' | 'Gray';
}

const Container = styled.div<ButtonProps>`
  display: flex;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  margin-left: 12px;
  position: relative;
  padding: 14px 24px;
  border-radius: 8px;
  color: ${({ theme, $isOpen }) =>
    $isOpen ? theme.text.contrast.primary : theme.palette.primary};
  width: ${({ $isOpen }) => ($isOpen ? '104px' : '64px')};
  background-color: ${({ theme, $variant, $isOpen }) =>
    !$isOpen
      ? $variant === 'White'
        ? theme.background.primary
        : theme.background.secondary
      : 'transparent'};
  & > svg path,
  use {
    fill: ${({ theme, $isOpen }) =>
      $isOpen ? theme.text.contrast.primary : theme.palette.primary};
  }
`;

const Text = styled.div`
  margin: auto 0;
  font-weight: 600;
  line-height: 20px;
`;

const FilterIcon = styled(FilterSVG)`
  width: 20px;
  height: 20px;
  margin-right: 6px;
`;

const CloseIcon = styled(CloseSVG)`
  width: 20px;
  height: 20px;
  margin-right: 6px;
`;

const Badge = styled.div`
  top: 6px;
  right: 6px;
  width: 16px;
  height: 16px;
  font-size: 12px;
  font-weight: bold;
  line-height: 1.33;
  border-radius: 50%;
  position: absolute;
  text-align: center;
  color: ${({ theme }) => theme.background.primary};
  background-color: ${({ theme }) => theme.badge};
`;
