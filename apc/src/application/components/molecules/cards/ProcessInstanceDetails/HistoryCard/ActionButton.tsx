import React, { FC } from 'react';

import styled from 'styled-components';

import ViewSVG from '$application/assets/icons/eye.svg';
import { Button } from '$application/components/atoms/buttons/Button';
import IconButton from '$application/components/atoms/buttons/IconButton';
import { FormType } from '$application/components/organisms/forms/ViewFormModal';

export interface HistoryCardActionButtonProps {
  taskId?: string | null;
  type: string;
  name: string;
  description?: string | null;
  isDone: boolean;
  onCheckAndDo?: (task: any) => void;
  isLoadingData: boolean;
  isAssignee?: boolean;
  setOpenFormDialog: (value: React.SetStateAction<FormType | null | undefined>) => void;
}

export const HistoryCardActionButton: FC<HistoryCardActionButtonProps> = ({
  isDone,
  taskId,
  type,
  description,
  onCheckAndDo,
  name,
  isLoadingData,
  isAssignee = false,
  setOpenFormDialog,
}) => {
  const onViewFormData = (t: 'userTask' | 'startEvent') => isDone && setOpenFormDialog(t);

  return isDone ? (
    <IconButton
      color="Secondary"
      icon={<ViewSVG />}
      variant="Free"
      onClick={() => onViewFormData(type as FormType)}
      isLight={false}
      size="Lg"
      title="View Form Data"
    />
  ) : isAssignee ? (
    <StyledButton
      style={{ width: '144px', height: '39px' }}
      onClick={() =>
        onCheckAndDo?.({
          id: taskId,
          name,
          description,
        })
      }
      title={'Check and Do'}
      variant="contained"
      color="primary"
      isLoading={isLoadingData}
    />
  ) : null;
};

export default HistoryCardActionButton;

const buttonWidth = (isLoading?: boolean) =>
  `${isLoading ? '156px' : '140px'} !important`;
const StyledButton = styled(Button)`
  width: ${({ isLoading }) => buttonWidth(isLoading)};
  flex-shrink: 0;
`;
