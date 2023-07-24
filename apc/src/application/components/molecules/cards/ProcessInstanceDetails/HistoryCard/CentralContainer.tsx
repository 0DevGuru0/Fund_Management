/* eslint-disable max-lines */
import React, { FC } from 'react';

import dayjs from 'dayjs';
import styled from 'styled-components';

export interface HistoryCardProps {
  policyTitle?: string | null;
  description?: string | null;
  isDone: boolean;
  descriptionDate?: string;
  title: string;
  assignee?: string | null;
  isAssignee?: boolean;
}

export const HistoryCardCentralContainer: FC<HistoryCardProps> = ({
  isDone,
  title,
  policyTitle,
  description,
  descriptionDate,
  assignee,
  isAssignee = false,
}) => {
  const voucherDetail =
    (title.includes('Reserve Voucher') && `from ${policyTitle} `) || '';

  const extendedDescription = title + (description || '');

  return (
    <Container>
      {isDone ? (
        <div>
          <StepDescription>{extendedDescription}</StepDescription>
          <DescriptionWrapper>
            <InactiveStatusInfo>{`by ${
              assignee ?? 'the System'
            } ${voucherDetail}at `}</InactiveStatusInfo>
            <DescriptionDate>{`${dayjs(descriptionDate).format(
              'DD MMM YYYY HH:mm:ss',
            )}`}</DescriptionDate>
          </DescriptionWrapper>
        </div>
      ) : (
        <>
          <StatusInfo>{extendedDescription}</StatusInfo>
          <StepDescription>
            {isAssignee
              ? 'Waiting for you to complete the form'
              : 'Please wait the application to be processed'}
          </StepDescription>
        </>
      )}
    </Container>
  );
};

export default HistoryCardCentralContainer;

const StepDescription = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.grey[700]};
  margin: 2px 0;
`;

const StatusInfo = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.text.contrast.secondary};
  font-weight: bold;
`;

const InactiveStatusInfo = styled.span`
  font-size: 16px;
  margin-right: 4px;
  color: ${({ theme }) => theme.text.contrast.secondary};
`;

const DescriptionDate = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.palette.grey[700]};
  white-space: nowrap;
`;

const DescriptionWrapper = styled.span``;

const Container = styled.div`
  margin-left: 24px;
  flex-grow: 1;
`;
