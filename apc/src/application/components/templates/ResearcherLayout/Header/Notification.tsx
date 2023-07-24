import React, { FC } from 'react';

import clsx from 'classnames';
import styled, { css } from 'styled-components';

import BellSVG from '$application/assets/icons/bell-fill.svg';
import Tooltip from '$application/components/atoms/etc/Tooltip';

export interface NotificationProps {
  status: 'seen' | 'new';
  className?: string;
}

export const Notification: FC<NotificationProps> = ({ status, className }) => {
  const hasNewNotification = status === 'new';
  return (
    <Tooltip title="Notification" aria-label="Notification">
      <MainContainer
        className={clsx('Notification', className)}
        hasNewNotification={hasNewNotification}
      >
        {hasNewNotification && <Badge />}
        <BellIcon />
      </MainContainer>
    </Tooltip>
  );
};

const BellIcon = styled(BellSVG)`
  stroke: #fff;
`;

interface IMainContainer {
  hasNewNotification: boolean;
}
const MainContainer = styled.div<IMainContainer>`
  background-color: ${({ theme }) => theme.background.primary};
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;

  & > svg {
    pointer-events: none;
    width: 24px;
    height: 24px;
    path {
      fill: ${({ theme }) => theme.text.lowContrast};
    }
  }

  ${({ hasNewNotification }) =>
    hasNewNotification &&
    css`
      & > svg path {
        fill: ${({ theme }) => theme.text.primary};
      }
    `}

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.background.secondary};

    & > svg path {
      fill: ${({ theme }) => theme.text.primary};
    }
  }
`;

const Badge = styled.div`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  position: absolute;
  top: 4px;
  right: 5px;
  pointer-events: none;
  border: 2px solid ${({ theme }) => theme.background.primary};
  background-color: ${({ theme }) => theme.cmp.header.alert};
`;
