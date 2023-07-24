import React, { FC } from 'react';

import styled from 'styled-components';

interface InputLabelProps {
  label?: string;
  isFilled: boolean;
  disabled?: boolean;
  isOptional?: boolean;
}

export const InputLabel: FC<InputLabelProps> = ({
  label,
  isFilled,
  disabled = false,
  isOptional = false,
}) => {
  return (
    <LabelContainer>
      {label && (
        <Label $isFilled={isFilled} $disabled={disabled}>
          {label}
        </Label>
      )}
      {isOptional && <Optional>(optional)</Optional>}
    </LabelContainer>
  );
};

export default InputLabel;

const LabelContainer = styled.div`
  display: flex;
  width: max-content;
`;

const Optional = styled.div`
  font-size: 12px;
  margin-left: 3px;
  line-height: 18px;
  color: ${({ theme }) => theme.palette.grey[700]};
`;

interface LabelProps {
  $isFilled: boolean;
  $disabled: boolean;
}

const Label = styled.div<LabelProps>`
  color: ${({ theme, $isFilled, $disabled }) =>
    $disabled
      ? $isFilled
        ? theme.palette.grey[700]
        : theme.palette.grey[800]
      : $isFilled
      ? theme.palette.grey[800]
      : theme.text.contrast.secondary};
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
`;
