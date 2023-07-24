import React, { useState, useRef, useEffect, createRef } from 'react';

import clsx from 'classnames';
import styled, { css } from 'styled-components';

import { useClickOutside } from '$application/utils/useClickOutSide';

type IStartAdornment = (hover, typingMode, isFilledMode) => JSX.Element;

export interface InputProps {
  value: string;
  errorText?: string;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  onChange: (val: string) => void;
  startAdornment?: JSX.Element | IStartAdornment;
  className?: string;
}

export const Input = ({ disabled = false, ...props }: InputProps) => {
  const containerRef = createRef<HTMLDivElement>();
  const [hover, setHover] = useState(false);
  const [typingMode, setTypingMode] = useState(false);
  const disableTypingMode = () => setTypingMode(false);

  const inputRef = useRef<HTMLInputElement>();
  const onInputContainerClicked = () => inputRef?.current?.focus();

  useClickOutside(containerRef, disableTypingMode);

  const isFilledMode = props.value !== '' && !typingMode;
  useEffect(() => {
    if (!isFilledMode && props.value === '') {
      containerRef.current?.blur();
      inputRef.current?.blur();
      disableTypingMode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFilledMode]);

  const StartAdornment = props.startAdornment
    ? React.isValidElement(props.startAdornment)
      ? props.startAdornment
      : (props.startAdornment as IStartAdornment)(hover, typingMode, isFilledMode)
    : '';

  return (
    <div className={clsx('Input', props.className)}>
      {!!props.label && (
        <Label $isLighten={typingMode || isFilledMode}>{props.label}</Label>
      )}
      <InputContainer
        ref={containerRef}
        $disabled={disabled}
        $hasContent={!!props.value}
        onClick={onInputContainerClicked}
        onMouseMove={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        $isFilledMode={isFilledMode}
        $isTypingMode={typingMode}
        $hasError={!!props.errorText}
      >
        {StartAdornment}
        <TextInput
          disabled={disabled}
          onFocus={() => setTypingMode(true)}
          ref={inputRef as any}
          placeholder={props.placeholder}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
        />
      </InputContainer>
      {props.errorText && <Error>{props.errorText}</Error>}
    </div>
  );
};

export default Input;

interface InputContainerProps {
  $hasError: boolean;
  $hasContent: boolean;
  $isFilledMode: boolean;
  $isTypingMode: boolean;
  $disabled: boolean;
}

const InputContainer = styled.div<InputContainerProps>`
  background-color: ${({ theme, $hasContent: hasContent }) =>
    hasContent ? theme.background.primary : theme.background.secondary};
  border: 1px solid
    ${({ theme, $hasContent, $hasError }) =>
      $hasError
        ? theme.palette.negative
        : $hasContent
        ? theme.palette.brand
        : theme.background.secondary};
  box-sizing: border-box;
  border-radius: 8px;
  width: 250px;
  height: 48px;
  padding: 14px;
  align-items: center;
  display: flex;
  position: relative;

  & > svg {
    margin-right: 6px;
  }

  & > svg path {
    width: 20px;
    height: 20px;
    stroke: ${({ theme }) => theme.text.lowContrast};
    fill: ${({ theme }) => theme.text.lowContrast};
  }
  ${({ $disabled }) =>
    !$disabled &&
    css`
      &:hover {
        cursor: pointer;
        background-color: ${({ theme }) => theme.background.primary};
        border: 1px solid ${({ theme }) => theme.palette.brand};
      }
    `}

  ${({ $isTypingMode, $hasError }) =>
    $isTypingMode &&
    css`
      box-shadow: 0 0 0 3px ${({ theme }) => theme.cmp.search.shadow};
      background-color: ${({ theme }) => theme.background.primary};
      border: 1px solid
        ${({ theme }) => ($hasError ? theme.palette.negative : theme.palette.brand)};
    `}

  ${({ $isFilledMode, $disabled, $hasError }) =>
    $isFilledMode &&
    !$disabled &&
    css`
      border: 1px solid
        ${({ theme }) => ($hasError ? theme.palette.negative : theme.link.text)};
    `}
${({ $disabled }) =>
    $disabled &&
    css`
      border: 1px solid ${({ theme }) => theme.palette.grey[600]};
      background-color: ${({ theme }) => theme.palette.grey[200]};
    `}
`;
const TextInput = styled.input`
  flex-grow: 1;
  background-color: transparent;
  height: 20px;
  border: none;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.text.contrast.primary};
  }
  &:disabled {
    color: ${({ theme }) => theme.palette.grey[800]};
  }
`;

const Error = styled.span`
  margin-top: 12px;
  display: inline-block;
  color: ${({ theme }) => theme.palette.negative};
`;

interface LabelProps {
  $isLighten: boolean;
}

const Label = styled.div<LabelProps>`
  color: ${({ theme, $isLighten }) =>
    $isLighten ? theme.text.primary : theme.text.contrast.secondary};
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
`;
