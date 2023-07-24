import React, { FC, ReactNode } from 'react';

import clsx from 'classnames';
import styled from 'styled-components';

import Tooltip from '../etc/Tooltip';

export interface SquareButtonProps {
  icon: ReactNode;
  fillIcon?: ReactNode;
  label?: string;
  width?: string;
  height?: string;
  tooltipTitle?: string;
  className?: string;
  disabled?: boolean;
  isSelected: boolean;
  handleClick: () => void;
}

export const SquareButton: FC<SquareButtonProps> = ({
  icon,
  fillIcon,
  width,
  tooltipTitle,
  height,
  className,
  label,
  isSelected,
  disabled = false,
  handleClick,
}) => {
  return (
    <MainContainer
      $disabled={disabled}
      className={clsx('SquareButton', className)}
      $width={width}
      $height={height}
      $isSelected={isSelected}
      onClick={!disabled ? handleClick : undefined}
    >
      <Tooltip title={tooltipTitle ?? ''}>
        <StyledIcon $isSelected={isSelected}>
          {isSelected ? fillIcon ?? icon : icon}
        </StyledIcon>
      </Tooltip>
      {label && <Label $isSelected={isSelected}>{label}</Label>}
    </MainContainer>
  );
};

export default SquareButton;

interface MainContainerProps {
  $isSelected: boolean;
  $width?: string;
  $height?: string;
  $disabled: boolean;
}

const MainContainer = styled.div<MainContainerProps>`
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 12px;
  width: ${({ $width }) => $width ?? '107px'};
  height: ${({ $height }) => $height ?? '74px'};
  background-color: ${({ theme, $isSelected, $disabled }) =>
    !$disabled
      ? $isSelected
        ? theme.palette.secondary
        : theme.background.primary
      : theme.palette.grey[400]};
  border: ${({ theme, $isSelected, $disabled }) =>
    $isSelected || $disabled ? 'none' : `1px solid ${theme.palette.grey[500]}`};
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    border: ${({ theme, $isSelected, $disabled }) =>
      $isSelected || $disabled ? 'none' : `1px solid ${theme.palette.secondary}`};
  }
`;

interface StyledIconProps {
  $isSelected: boolean;
}

const StyledIcon = styled.div<StyledIconProps>`
  text-align: center;
  & > svg {
    width: 24px;
    height: 24px;
    path,
    use {
      fill: ${({ theme, $isSelected }) =>
        $isSelected ? theme.palette.grey[100] : theme.palette.grey[700]};
    }
  }
`;

interface LabelProps {
  $isSelected: boolean;
}

const Label = styled.div<LabelProps>`
  color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.palette.grey[100] : theme.palette.grey[800]};
  font-weight: ${({ $isSelected }) => ($isSelected ? 'bold' : 'normal')};
  font-size: 16px;
  text-transform: capitalize;
`;
