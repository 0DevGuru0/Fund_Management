import React, { FC } from 'react';

import styled from 'styled-components';

import { Button } from '$application/components/atoms/buttons/Button';

interface ActionButtonsProps {
  onSubmit: () => void;
  onCancel: () => void;
  buttonLoading: boolean;
  addButtonEnabled?: boolean;
}

export const ActionButtons: FC<ActionButtonsProps> = ({
  onSubmit,
  onCancel,
  buttonLoading,
  addButtonEnabled = false,
}) => {
  return (
    <ActionsContainer>
      <Button
        title="cancel"
        color="default"
        onClick={onCancel}
        variant="contained"
        style={{ height: '48px', width: '100%' }}
      />
      <StyledButton
        title="add"
        color="primary"
        onClick={onSubmit}
        variant="contained"
        isLoading={buttonLoading}
        disabled={!addButtonEnabled}
        style={{ height: '48px', width: '100%' }}
      />
    </ActionsContainer>
  );
};
const StyledButton = styled(Button)``;
const ActionsContainer = styled.div`
  gap: 0 12px;
  display: flex;
  margin-top: 60px;
  align-items: stretch;
  justify-content: space-between;
  padding: 0 36px 36px 36px;
  & > * {
    flex-grow: 1;
    height: 48px !important;
  }
`;
