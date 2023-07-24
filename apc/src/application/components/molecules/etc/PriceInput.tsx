import React, { FC, useState } from 'react';

import numeral from 'numeral';
import styled from 'styled-components';

import InputContainer from './PriceInput/InputContainer';
import InputLabel from './PriceInput/InputLabel';

export interface PriceInputProps {
  value: string;
  label?: string;
  delay?: number;
  maxValue?: number;
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
  isOptional?: boolean;
  placeHolder?: string;
  selectedCurrency: string;
  onChange: (value: string) => void;
  onSelect: (value: string) => void;
}

export const PriceInput: FC<PriceInputProps> = ({
  label,
  value,
  delay,
  maxValue,
  onChange,
  onSelect,
  fullWidth,
  className,
  isOptional,
  placeHolder,
  selectedCurrency,
  disabled = false,
}) => {
  const [typing, setTyping] = useState(false);
  const isFilled = value !== '' && !typing;
  const badInput = !!maxValue && value !== '' && +numeral(value).value() > maxValue;
  return (
    <Container className={className} $fullWidth={fullWidth}>
      <InputLabel
        label={label}
        typing={typing}
        disabled={disabled}
        isFilled={isFilled}
        isOptional={isOptional}
      />
      <InputContainer
        delay={delay}
        value={value}
        isTyping={typing}
        isError={badInput}
        disabled={disabled}
        onType={setTyping}
        onChange={onChange}
        onSelect={onSelect}
        placeHolder={placeHolder}
        selectedCurrency={selectedCurrency}
      />
      {badInput && <Error>The entered value is out of range</Error>}
    </Container>
  );
};

export default PriceInput;

interface RootContainerProps {
  $fullWidth?: boolean;
}

const Container = styled.div<RootContainerProps>`
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : '285px')};
`;

const Error = styled.div`
  margin-top: 12px;
  color: ${({ theme }) => theme.palette.negative};
`;
