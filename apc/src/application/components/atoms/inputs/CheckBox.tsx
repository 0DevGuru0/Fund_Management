import React, { FC } from 'react';

import clsx from 'classnames';
import styled, { keyframes } from 'styled-components';

export interface CheckboxProps {
  id: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  isChecked?: boolean;
  isHovered?: boolean;
  onChange?: () => void;
}

export const Checkbox: FC<CheckboxProps> = ({
  id,
  label,
  disabled,
  isChecked = false,
  isHovered,
  className,
  onChange,
}) => {
  return (
    <Label
      htmlFor={id}
      $disabled={disabled}
      $isChecked={isChecked}
      className={clsx('Checkbox', className)}
    >
      {label}
      <Input
        id={id}
        type="checkbox"
        disabled={disabled}
        checked={isChecked}
        onChange={onChange}
      />
      <Indicator $isChecked={isChecked} $isHovered={isHovered} $disabled={disabled} />
    </Label>
  );
};

const Input = styled.input`
  display: none;
`;

interface InputProps {
  $isChecked: boolean;
  $disabled?: boolean;
  $isHovered?: boolean;
}

const checkboxSize = 18;
const padding = 2;

const Label = styled.label<InputProps>`
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
  margin-left: 32px;
  position: relative;
  white-space: nowrap;
  display: inline-block;
  color: ${({ theme, $isChecked, $disabled }) =>
    $disabled
      ? theme.palette.grey['700']
      : $isChecked
      ? theme.text.contrast.secondary
      : theme.text.primary};
  font-weight: ${({ $isChecked }) => ($isChecked ? 600 : 'normal')};
  &:hover {
    color: ${({ theme, $disabled }) => !$disabled && theme.text.contrast.secondary};
  }
`;

const Transition = keyframes`
 from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Indicator = styled.div<InputProps>`
  top: 3px;
  left: -32px;
  padding: ${padding}px;
  width: calc(${checkboxSize}px - ${padding * 4}px);
  height: calc(${checkboxSize}px - ${padding * 4}px);
  border-radius: 3px;
  position: absolute;
  background-color: ${({ theme, $disabled }) =>
    $disabled ? theme.palette.grey['500'] : theme.background.primary};
  border: 2px solid
    ${({ theme, $isChecked, $isHovered, $disabled }) =>
      $disabled
        ? theme.palette.grey['500']
        : $isChecked || $isHovered
        ? theme.palette.secondary
        : theme.text.contrast.primary};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};

  ${Label}:hover & {
    border-color: ${({ theme, $disabled }) => !$disabled && theme.palette.secondary};
  }

  &::after {
    content: '';
    display: none;
    position: absolute;
  }

  ${Input}:checked + &::after {
    width: 10px;
    height: 10px;
    display: block;
    animation-duration: 0.3s;
    animation-name: ${Transition};
    background-color: ${({ theme }) => theme.palette.secondary};
    border-color: ${({ theme, $disabled }) => !$disabled && theme.palette.secondary};
  }
`;
