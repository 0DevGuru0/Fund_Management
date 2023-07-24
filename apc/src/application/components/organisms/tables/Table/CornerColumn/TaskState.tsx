import React, { FC } from 'react';

import { rgba } from 'polished';
import styled, { css } from 'styled-components';

import ArrowSVG from '$application/assets/icons/arrow-right.svg';
import { TaskRouteWrapperProps } from '$application/components/pages/ResearcherOverview/TaskRouteWrapper';
import { taskToColor } from '$application/lib/taskToColor';

export interface TaskStateProps {
  label: keyof typeof taskToColor;
  updateDate?: string;
  isHovered: boolean;
  onClick?: () => void;
  routeWrapper?: FC<TaskRouteWrapperProps>;
}

const SimpleWrapper: FC = ({ children }) => <>children</>;

export const TaskState: FC<TaskStateProps> = ({
  label,
  updateDate,
  isHovered,
  onClick,
  routeWrapper: RouteWrapper,
}) => {
  const Wrapper = RouteWrapper ?? SimpleWrapper;

  return (
    <MainContainer>
      <LeftContainer>
        <StatusContainer variant={taskToColor[label]}>{label}</StatusContainer>
        {updateDate && (
          <LastUpdateContainer>last update: {updateDate}</LastUpdateContainer>
        )}
      </LeftContainer>
      {isHovered && (onClick || RouteWrapper) && (
        <Wrapper>
          <Button onClick={onClick}>
            <ArrowSVG />
          </Button>
        </Wrapper>
      )}
    </MainContainer>
  );
};

interface StatusProps {
  variant: string;
}

const MainContainer = styled.div`
  display: flex;
  align-items: stretch;
  background-color: transparent;
  font-size: ${({ theme }) => theme.typography.fontSize};
  height: 100%;
`;

const LeftContainer = styled.div`
  margin: auto 36px auto 0;
`;

const LastUpdateContainer = styled.div`
  margin-top: 2px;
  line-height: 18px;
  font-weight: normal;
  color: ${({ theme }) => theme.text.contrast.primary};
`;

const StatusContainer = styled.div<StatusProps>`
  width: max-content;
  font-weight: bold;
  text-align: center;
  border-radius: 4px;
  padding: 3px 12px;
  ${({ variant }) => {
    return css`
      color: ${variant};
      border: 1px ${variant} solid;
      background-color: ${rgba(variant, 0.08)};
    `;
  }}
`;

const Button = styled.div`
  width: 18px;
  height: 18px;
  padding: 3px;
  margin: auto 0;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.background.overlay};
  ${MainContainer}:hover & {
    display: block;
    cursor: pointer;
  }
  & > svg {
    width: 18px;
    height: 18px;
    margin: auto;
  }
  & > svg path {
    fill: ${({ theme }) => theme.text.lowContrast};
  }
  &:hover {
    background-color: ${({ theme }) => theme.cmp.button.tertiary};
    & > svg path {
      fill: ${({ theme }) => theme.palette.primary};
    }
  }
`;
