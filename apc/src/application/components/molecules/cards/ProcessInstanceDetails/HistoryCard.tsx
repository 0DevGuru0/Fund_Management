/* eslint-disable max-lines */
import React, { FC, useState } from 'react';

import dayjs from 'dayjs';
import { flow, keyBy, mapValues } from 'lodash';
import { rgba } from 'polished';
import styled from 'styled-components';

import CheckSVG from '$application/assets/icons/check.svg';
import LoadingSVG from '$application/assets/icons/loading.svg';
import PDFFileSVG from '$application/assets/icons/pdf-file.svg';
import ViewFormModal, {
  FormType,
} from '$application/components/organisms/forms/ViewFormModal';
import { useUserInfo } from '$application/lib/auth/useUserInfo';
import {
  useGetProcessInstanceById,
  useGetStartFormConfig,
  useGetTaskById,
  useGetTaskFormConfig,
} from '$application/lib/generated/apcApi';

import HistoryCardActionButton from './HistoryCard/ActionButton';
import HistoryCardCentralContainer from './HistoryCard/CentralContainer';

export interface HistoryCardProps {
  id: string;
  taskId?: string | null;
  processInstanceId?: string | null;
  processDefinitionId?: string | null;
  policyTitle?: string | null;
  voucherCode?: string | null;
  type: string;
  name: string;
  description?: string | null;
  isDone: boolean;
  descriptionDate?: string;
  title: string;
  assignee?: string | null;
  isManagement?: boolean;
  onPDFClick?: () => void;
  onCheckAndDo?: (task: any) => void;
}

export const HistoryCard: FC<HistoryCardProps> = ({
  id,
  voucherCode,
  isDone,
  processInstanceId,
  taskId,
  processDefinitionId,
  type,
  title,
  policyTitle,
  description,
  descriptionDate,
  assignee,
  isManagement = false,
  onCheckAndDo,
  onPDFClick,
  name,
}) => {
  const userInfo = useUserInfo();
  const username = userInfo.preferred_username;
  const isAssignee = username === assignee;

  const { data: task } = useGetTaskById(taskId ?? undefined);
  const dueDate = task?.due;

  const [openFormDialog, setOpenFormDialog] = useState<FormType | null>();

  const {
    data: processInstance,
    isLoading: variablesAreLoading,
  } = useGetProcessInstanceById(
    processInstanceId!,
    { fields: 'variables' },
    { query: { enabled: !!openFormDialog } },
  );

  const {
    data: taskFormConfig,
    isLoading: taskFormConfigIsLoading,
  } = useGetTaskFormConfig(taskId!, {
    query: { enabled: openFormDialog === 'userTask' },
  });

  const {
    data: startFormConfig,
    isLoading: startFormConfigIsLoading,
  } = useGetStartFormConfig(processDefinitionId!, {
    query: { enabled: openFormDialog === 'startEvent' },
  });

  const onClose = () => setOpenFormDialog(null);

  const isLoadingData =
    (variablesAreLoading || taskFormConfigIsLoading || startFormConfigIsLoading) &&
    !!openFormDialog;

  const allProcessInstanceVariables = flow(
    (variables) => keyBy(variables, 'name'),
    (variables) => mapValues(variables, 'value'),
  )(processInstance?.variables);

  const hasForm = (type === 'userTask' && taskId != null) || type === 'startEvent';

  return (
    <CardWrapper>
      <Container isManagement={isManagement} isDone={isDone} hasForm={hasForm}>
        <StatusLogo isDone={isDone}>{isDone ? <CheckSVG /> : <LoadingSVG />}</StatusLogo>
        <HistoryCardCentralContainer
          policyTitle={policyTitle}
          description={description}
          isDone={isDone}
          descriptionDate={descriptionDate}
          title={title}
          assignee={assignee}
          isAssignee={isAssignee}
        />
        {!isDone && (
          <DueDate>{`Due date: ${
            dueDate ? dayjs(dueDate).format('DD MMM YYYY') : 'Not Restricted'
          }`}</DueDate>
        )}
        {hasForm && (
          <HistoryCardActionButton
            isDone={isDone}
            taskId={taskId}
            type={type}
            description={description}
            onCheckAndDo={onCheckAndDo}
            name={name}
            isLoadingData={isLoadingData}
            setOpenFormDialog={setOpenFormDialog}
            isAssignee={isAssignee}
          />
        )}
        {id === 'ReserveVoucher' && voucherCode && (
          <VoucherCode>
            <span>Voucher Code: </span>
            {voucherCode}
          </VoucherCode>
        )}
        {!!onPDFClick && <StyledPDF onClick={onPDFClick} />}
      </Container>

      <ViewFormModal
        openFormDialog={openFormDialog}
        name={name}
        onClose={onClose}
        type={type}
        startFormConfig={startFormConfig}
        taskFormConfig={taskFormConfig}
        allProcessInstanceVariables={allProcessInstanceVariables}
      />
    </CardWrapper>
  );
};

export default HistoryCard;

interface ContainerProps {
  isDone: boolean;
  hasForm: boolean;
  isManagement: boolean;
}

const containerBorderColor = (theme) => `solid 1px ${theme.palette.grey['300']}`;
const containerShadowColor = (theme) => `0 2px 6px 0 ${theme.palette.primaryLight}`;
const Container = styled.div<ContainerProps>`
  display: flex;
  position: relative;
  height: ${({ isManagement }) => (isManagement ? '88px' : '112px')};
  background-color: ${({ theme, isDone }) =>
    isDone ? rgba(theme.background.primary, 0.75) : theme.background.primary};
  border-radius: 12px;
  border: ${({ isManagement, isDone, theme }) =>
    isManagement && !isDone && containerBorderColor(theme)};
  margin-right: ${({ isManagement }) => isManagement && '36px'};
  padding: 36px;
  box-sizing: border-box;
  align-items: center;
  cursor: ${({ hasForm }) => (hasForm ? 'pointer' : 'default')};
  box-shadow: ${({ theme, isManagement }) =>
    !isManagement && containerShadowColor(theme)};
`;

interface StatusLogoProps {
  isDone: boolean;
}

const StatusLogo = styled.div<StatusLogoProps>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${({ theme, isDone }) =>
    isDone ? theme.cmp.historyCard.done.light : theme.palette.grey[500]};
  & > svg {
    width: 20px;
    height: 20px;
    display: block;
    margin: 8px;
  }
  & > svg path,
  use {
    margin: 8px;
    fill: ${({ theme, isDone }) =>
      isDone ? theme.cmp.historyCard.done.solid : theme.palette.grey[800]};
  }
`;

const StyledPDF = styled(PDFFileSVG)`
  cursor: pointer;
  path,
  use {
    fill: ${({ theme }) => theme.palette.grey[700]};
  }
  width: 36px;
  height: 36px;
  margin-left: 24px;
`;

const DueDate = styled.div`
  color: ${({ theme }) => theme.palette.grey[700]};
  font-size: 14px;
  font-weight: bold;
  padding: 0 24px;
`;

const VoucherCode = styled.div`
  span {
    color: ${({ theme }) => theme.palette.grey[600]};
    font-weight: normal;
  }
  color: ${({ theme }) => theme.palette.grey[700]};
  font-size: 14px;
  font-weight: bold;
`;

const CardWrapper = styled.div`
  position: relative;
`;
