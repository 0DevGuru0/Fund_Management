import React, { FC } from 'react';

import styled from 'styled-components';

interface InputLabelProps {
  label?: string;
  typing: boolean;
  isFilled: boolean;
  disabled?: boolean;
  isOptional?: boolean;
}

export const InputLabel: FC<InputLabelProps> = ({
  label,
  typing,
  isFilled,
  disabled = false,
  isOptional = false,
}) => {
  return (
    <LabelContainer>
      {!!label && (
        <Label isLight={typing || isFilled} disabled={disabled}>
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
  isLight: boolean;
  disabled: boolean;
}

const Label = styled.div<LabelProps>`
  color: ${({ theme, isLight, disabled }) =>
    disabled
      ? theme.palette.grey[600]
      : isLight
      ? theme.palette.grey[800]
      : theme.text.contrast.secondary};
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
`;
