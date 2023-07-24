import React, { FC } from 'react';

import dayjs from 'dayjs';
import { rgba } from 'polished';
import styled, { css } from 'styled-components';

import LockSVG from '$application/assets/icons/lock.svg';
import MoreSVG from '$application/assets/icons/more-vertical.svg';
import IconButton from '$application/components/atoms/buttons/IconButton';
import { CardLinkWrapperProps } from '$application/components/pages/Journals/JournalsGroup/CardLinkWrapper';
import { taskToColor } from '$application/lib/taskToColor';

export interface JournalGroupCardProps {
  id: string;
  title: string;
  label: keyof typeof taskToColor;
  moreActions?: boolean;
  restricted?: boolean;
  createdAt: Date | string;
  journalsCount: number;
  publisher?: string;
  wrapper?: FC<CardLinkWrapperProps>;
}

export const JournalGroupCard: FC<JournalGroupCardProps> = ({
  id,
  title,
  label,
  moreActions = false,
  restricted = false,
  createdAt,
  journalsCount,
  publisher,
  wrapper: Wrapper,
}) => {
  const cardContent = (
    <MainContainer id={`card-${id}`}>
      <RowContainer>
        <HeadLineContainer>
          <Title>{title}</Title>
          <StatusContainer $variant={taskToColor[label]}>{label}</StatusContainer>
        </HeadLineContainer>
        {moreActions && (
          // TODO: Should be replaced by implemented More button IW-366
          <IconButton
            variant="Contained"
            color="Normal"
            title="Tooltip"
            icon={<MoreSVG />}
            onClick={() => ({})}
          />
        )}
      </RowContainer>
      <LastUpdateContainer>{publisher}</LastUpdateContainer>
      <LastUpdateContainer>{dayjs(createdAt).format('DD MMM YYYY')}</LastUpdateContainer>
      <RowContainer>
        <HeadLineContainer>
          <JournalCountContainer>{journalsCount}</JournalCountContainer>
          <JournalText>{journalsCount === 1 ? 'Journal' : 'Journals'}</JournalText>
        </HeadLineContainer>
        {restricted && (
          <Restricted>
            <LockSVG />
            Restricted
          </Restricted>
        )}
      </RowContainer>
    </MainContainer>
  );

  return Wrapper ? <Wrapper groupId={id}>{cardContent}</Wrapper> : cardContent;
};

const MainContainer = styled.div`
  background-color: ${({ theme }) => theme.background.primary};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  box-sizing: border-box;
  padding: 36px 36px 24px 36px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 24px 0 ${({ theme }) => rgba(theme.palette.grey['600']!, 0.3)};
  }
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.text.contrast.secondary};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  max-height: 38px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LastUpdateContainer = styled.div`
  margin-top: 6px;
  font-size: 14px;
  color: ${({ theme }) => theme.text.contrast.primary};
`;

interface StatusProps {
  $variant: string;
}

const StatusContainer = styled.div<StatusProps>`
  font-size: 12px;
  width: max-content;
  font-weight: bold;
  text-align: center;
  border-radius: 4px;
  padding: 3px 10px;
  ${({ $variant }) => {
    return css`
      color: ${$variant};
      border: 1px ${$variant} solid;
      background-color: ${rgba($variant, 0.08)};
    `;
  }}
`;

const JournalCountContainer = styled.div`
  font-size: 36px;
  font-weight: bold;
  line-height: 46px;
  margin-top: 14px;
  color: ${({ theme }) => theme.text.contrast.secondary};
`;

const JournalText = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.grey[800]};
`;

const Restricted = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.palette.grey[300]};
  & > svg {
    width: 20px;
    height: 20px;
    margin-right: 3px;
  }
  & > svg path,
  use {
    fill: ${({ theme }) => theme.palette.grey[300]};
  }
`;

const HeadLineContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-right: 12px;
`;

const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
