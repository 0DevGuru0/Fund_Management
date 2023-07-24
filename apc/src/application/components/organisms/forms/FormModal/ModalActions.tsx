import React, { FC } from 'react';

import styled from 'styled-components';

import TrashSVG from '$application/assets/icons/trash.svg';
import { Button } from '$application/components/atoms/buttons/Button';
import IconButton from '$application/components/atoms/buttons/IconButton';

interface ActionButtonsProps {
  onSubmit: () => void;
  onClear: () => void;
  onCancel: () => void;
  buttonLoading: boolean;
  showScrollShadow: boolean;
}

export const ModalActions: FC<ActionButtonsProps> = ({
  buttonLoading,
  onSubmit,
  onClear,
  showScrollShadow,
  onCancel,
}) => {
  return (
    <DialogActions $showShadow={showScrollShadow}>
      <IconButton
        title="Clear Form"
        icon={<TrashSVG />}
        color="Negative"
        variant="WithText"
        onClick={onClear}
      />
      <div>
        <Button
          title="Cancel"
          color="default"
          variant="contained"
          style={{ marginRight: '11px' }}
          onClick={onCancel}
        />
        <StyledButton
          title="submit"
          color="primary"
          variant="contained"
          onClick={onSubmit}
          isLoading={buttonLoading}
        />
      </div>
    </DialogActions>
  );
};

const StyledButton = styled(Button)``;

const DialogActions = styled.div<{ $showShadow: boolean }>`
  box-shadow: ${({ $showShadow }) =>
    $showShadow && '1px 1px 17px 15px rgb(227 235 247 / 40%)'};
  z-index: 15;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 36px 24px 36px;
`;

export default ModalActions;
