import React, { FC, useState } from 'react';

import styled from 'styled-components';

import { SubmitTaskModal } from '$application/components/organisms/forms/SubmitTaskModal';

import { CardWrapper } from './ProcessInstanceDetails/CardWrapper';
import HistoryCard, { HistoryCardProps } from './ProcessInstanceDetails/HistoryCard';
import RequestSummary, {
  RequestSummaryProps,
} from './ProcessInstanceDetails/RequestSummary';

import { hideScrollBar } from '$utils';

export interface ProcessInstanceDetailsProps {
  summary: RequestSummaryProps;
  steps?: HistoryCardProps[];
  processInstanceId?: string;
  processDefinitionId?: string;
  policyTitle?: string;
  isManagement?: boolean;
  voucherCode?: string;
}

export const ProcessInstanceDetails: FC<ProcessInstanceDetailsProps> = ({
  summary,
  steps,
  processInstanceId,
  processDefinitionId,
  policyTitle,
  isManagement = false,
  voucherCode,
}) => {
  const [taskToDo, setTaskToDo] = useState<any>();

  const onCheckAndDo = (task) => {
    setTaskToDo(task);
  };

  const onCancel = () => {
    setTaskToDo(null);
  };

  return (
    <Container>
      <StyledRequestSummary isManagement={isManagement} {...summary} />
      <StepsList>
        {taskToDo && (
          <SubmitTaskModal
            title={taskToDo.name}
            subTitle={taskToDo.description}
            taskId={taskToDo.id}
            processInstanceId={processInstanceId}
            onCancel={onCancel}
          />
        )}
        <ListHeader>Process Timeline</ListHeader>
        {steps?.map((step, key) => (
          <CardWrapper key={step.taskId ?? step.descriptionDate} isActive={step.isDone}>
            <HistoryCard
              {...step}
              voucherCode={voucherCode}
              processInstanceId={processInstanceId}
              processDefinitionId={processDefinitionId}
              policyTitle={policyTitle}
              onCheckAndDo={onCheckAndDo}
              isManagement={isManagement}
            />
          </CardWrapper>
        ))}
      </StepsList>
    </Container>
  );
};

export default ProcessInstanceDetails;

const Container = styled.div`
  display: flex;
`;

const StepsList = styled.div`
  ${hideScrollBar}
  flex-grow: 1;
`;
const ListHeader = styled.div`
  ${hideScrollBar}
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.link.text};
  margin: 26px 0 14px 0;
  overflow-y: auto;
`;

interface StyledRequestSummaryProps {
  isManagement: boolean;
}

const StyledRequestSummary = styled(RequestSummary)<StyledRequestSummaryProps>`
  margin-right: 24px;
  background-color: ${({ theme, isManagement }) =>
    isManagement ? theme.palette.grey['400'] : undefined};
  border-radius: 12px;
  height: ${({ isManagement }) => (isManagement ? '352px' : '310px')};
  width: ${({ isManagement }) => (isManagement ? '369px' : undefined)};
  margin-left: ${({ isManagement }) => (isManagement ? '36px' : undefined)};
  padding-bottom: 26px;
`;
