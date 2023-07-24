import React, { FC } from 'react';

import { rgba } from 'polished';
import styled, { css } from 'styled-components';

import { SelectProps } from '../Select';

import Controller from './Selector/Controller';

export type SelectorProps = Pick<
  SelectProps,
  'icon' | 'label' | 'placeHolder' | 'loading' | 'disabled' | 'renderInput'
> & {
  isOpen: boolean;
  hasError: boolean;
  isFilled: boolean;
  isFocused: boolean;
  selectedValue: string;
};

export const Selector: FC<SelectorProps> = ({
  loading = false,
  disabled = false,
  ...props
}) => {
  return (
    <Container
      $error={props.hasError}
      $filled={props.isFilled}
      $focused={props.isFocused}
      $disabled={disabled}
    >
      {props.icon && <IconContainer $disabled={disabled}>{props.icon}</IconContainer>}
      {props.renderInput && props.isOpen ? (
        props.renderInput()
      ) : (
        <SelectedOption
          $hasIcon={!!props.icon}
          $filled={props.isFilled}
          $disabled={disabled}
        >
          {props.isFilled ? props.selectedValue : props.placeHolder ?? 'Select'}
        </SelectedOption>
      )}
      <Controller
        loading={loading}
        disabled={disabled}
        hasLabel={!!props.label}
        focused={props.isFocused}
      />
    </Container>
  );
};

export default Selector;

interface ContainerProps {
  $filled: boolean;
  $error?: boolean;
  $focused: boolean;
  $disabled?: boolean;
}

const Container = styled.div<ContainerProps>`
  height: 24px;
  padding: 14px;
  display: flex;
  border-radius: 8px;
  background-color: ${({ theme, $filled, $focused, $error, $disabled }) =>
    $disabled
      ? rgba(theme.palette.grey['200']!, 0.5)
      : $error || $filled || $focused
      ? theme.background.primary
      : theme.background.secondary};
  border: 1px
    ${({ theme, $filled, $focused, $error, $disabled }) =>
      $disabled
        ? $filled
          ? theme.palette.grey['600']
          : rgba(theme.palette.grey['200']!, 0.5)
        : $error
        ? theme.palette.negative
        : $focused
        ? theme.cmp.input.lowContrast
        : $filled
        ? theme.text.primary
        : theme.background.secondary}
    solid;
  box-shadow: ${({ $focused }) =>
    $focused ? '0 0 0 3px rgba(192, 239, 239, 0.4)' : 'none'};
  ${({ $disabled }) =>
    !$disabled &&
    css`
      &:hover {
        border: 1px ${({ theme }) => theme.cmp.input.lowContrast} solid;
        background-color: ${({ theme }) => theme.background.primary};
      }
    `}
`;

interface IconContainerProps {
  $disabled?: boolean;
}

const IconContainer = styled.div<IconContainerProps>`
  width: 24px;
  height: 24px;
  margin-right: 6px;
  & > svg path {
    width: inherit;
    height: inherit;
    fill: ${({ theme, $disabled }) =>
      $disabled ? theme.palette.grey['500'] : theme.text.primary};
  }
`;

type TextProps = {
  $hasIcon?: boolean;
} & Omit<ContainerProps, '$focused'>;

const SelectedOption = styled.div<TextProps>`
  margin: auto;
  font-size: 16px;
  line-height: 20px;
  margin-right: 12px;
  font-weight: normal;
  width: calc(100% - 50px);
  margin-left: ${({ $hasIcon }) => ($hasIcon ? 6 : 10)}px;
  color: ${({ theme, $filled, $disabled }) =>
    $disabled
      ? $filled
        ? theme.palette.grey[800]
        : theme.palette.grey[600]
      : $filled
      ? theme.text.contrast.secondary
      : theme.text.contrast.primary};
  /* This is to apply ellipsis (...) on lengthy item */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
