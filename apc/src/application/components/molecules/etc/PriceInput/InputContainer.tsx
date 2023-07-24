import React, { createRef, FC, useEffect, useRef } from 'react';

import { debounce, DebouncedFunc } from 'lodash';
import numeral from 'numeral';
import { rgba } from 'polished';
import styled, { css } from 'styled-components';

import { useClickOutside } from '$application/utils';
import { Currency } from '$service/doaj/types/Currency';

import CurrencySelect from './CurrencySelect';

interface InputContainerProps {
  value: string;
  delay?: number;
  isError: boolean;
  isTyping: boolean;
  isFilled?: boolean;
  disabled?: boolean;
  placeHolder?: string;
  selectedCurrency: string;
  onType: (value: boolean) => void;
  onChange: (value: string) => void;
  onSelect: (value: string) => void;
}

export const InputContainer: FC<InputContainerProps> = ({
  value,
  delay,
  isTyping,
  placeHolder,
  selectedCurrency,
  isError,
  disabled = false,
  isFilled = false,
  onType,
  onChange,
  onSelect,
}) => {
  const inputRef = useRef<HTMLInputElement>();
  const containerRef = createRef<HTMLDivElement>();
  const disableTypingMode = () => onType(false);
  useClickOutside(containerRef, disableTypingMode);
  const debounceRef = useRef<DebouncedFunc<() => void>>();

  const delayedSubmit = (newValue: string) => {
    if (debounceRef.current) debounceRef.current.cancel();
    if (newValue.trim() === '' && value.trim() === '') return;
    const processedValue =
      newValue !== '' ? String(numeral(newValue).format('0,0').trim()) : '';

    const newSubmission = debounce(onChange, delay ?? 100);
    debounceRef.current = newSubmission;
    newSubmission(processedValue);
  };

  const onValueChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    delayedSubmit(e.target.value);
  };

  useEffect(() => {
    if (!isFilled && value === '') {
      containerRef.current?.blur();
      inputRef.current?.blur();
      disableTypingMode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFilled]);

  return (
    <Root
      $isError={isError}
      $isTyping={isTyping}
      ref={containerRef}
      $disabled={disabled}
      $isFilled={isFilled}
      $hasContent={!!value}
      onClick={() => inputRef?.current?.focus()}
    >
      <Input
        value={value}
        maxLength={10}
        disabled={disabled}
        ref={inputRef as any}
        onChange={onValueChange}
        onFocus={() => onType(true)}
        placeholder={placeHolder ?? '0'}
      />
      <CurrencySelect
        disabled={disabled}
        onSelect={onSelect}
        selectedCurrency={selectedCurrency}
        currencyList={Object.values(Currency)}
      />
    </Root>
  );
};

export default InputContainer;

interface RootProps {
  $isError: boolean;
  $disabled: boolean;
  $isFilled: boolean;
  $isTyping: boolean;
  $hasContent: boolean;
}

const Root = styled.div<RootProps>`
  width: 100%;
  height: 54px;
  padding: 14px;
  display: flex;
  position: relative;
  border-radius: 8px;
  align-items: center;
  box-sizing: border-box;
  background-color: ${({ theme, $hasContent, $disabled }) =>
    $disabled
      ? rgba(theme.palette.grey['200']!, 0.5)
      : $hasContent
      ? theme.background.primary
      : theme.palette.grey['200']};
  border: 1px solid
    ${({ theme, $hasContent, $disabled }) =>
      $hasContent
        ? $disabled
          ? theme.palette.grey['600']
          : theme.palette.brand
        : theme.background.secondary};

  &:hover {
    border: 1px solid
      ${({ theme, $disabled, $isFilled }) =>
        $disabled
          ? $isFilled
            ? theme.palette.grey['600']
            : rgba(theme.palette.grey['200']!, 0.5)
          : theme.palette.brand};
    background-color: ${({ theme, $disabled }) => !$disabled && theme.background.primary};
  }

  ${({ $isTyping }) =>
    $isTyping &&
    css`
      border: 1px solid ${({ theme }) => theme.palette.brand};
      background-color: ${({ theme }) => theme.background.primary};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.cmp.search.shadow};
    `}

  ${({ $isFilled, $isError, $disabled }) =>
    $isFilled &&
    css`
      border: 1px solid
        ${({ theme }) =>
          $disabled
            ? theme.palette.grey['600']
            : $isError
            ? theme.palette.negative
            : theme.palette.grey[800]};
    `}
`;

const Input = styled.input`
  flex-grow: 1;
  height: 20px;
  border: none;
  outline: none;
  background-color: ${({ theme, disabled }) =>
    disabled ? rgba(theme.palette.grey['200']!, 0.5) : 'transparent'};

  &::placeholder {
    color: ${({ theme, disabled }) =>
      disabled ? theme.palette.grey['600'] : theme.text.contrast.primary};
  }
`;
