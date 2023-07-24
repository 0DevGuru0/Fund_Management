import React, { FC } from 'react';

import styled from 'styled-components';

import { TaskRouteWrapperProps } from '$application/components/pages/ResearcherOverview/TaskRouteWrapper';
import { StoryFC } from '$application/components/StoryFC';

import { TaskState, TaskStateProps } from './TaskState';

const sampleDate = new Date(2021, 2, 28);
const formattedDate = sampleDate.toLocaleString('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

export default {
  title: 'Organisms / Table / TaskState',
  component: TaskState,
};

export const ToDo: StoryFC<TaskStateProps> = (args) => {
  return (
    <TableCellContainer>
      <TaskState {...args} />
    </TableCellContainer>
  );
};

export const InProgress = ToDo.bind({});
export const Completed = ToDo.bind({});
export const Returned = ToDo.bind({});
export const Rejected = ToDo.bind({});

const routeWrapper: FC<TaskRouteWrapperProps> = ({ children }) => {
  return <>{children}</>;
};

ToDo.args = {
  label: 'To Do',
  updateDate: formattedDate,
  isHovered: false,
  routeWrapper,
};

InProgress.args = {
  label: 'In Progress',
  updateDate: formattedDate,
  isHovered: false,
  routeWrapper,
};

Completed.args = {
  label: 'Completed',
  updateDate: formattedDate,
  isHovered: false,
  routeWrapper,
};

Returned.args = {
  label: 'Returned',
  updateDate: formattedDate,
  isHovered: false,
  routeWrapper,
};

Rejected.args = {
  label: 'Rejected',
  updateDate: formattedDate,
  isHovered: false,
  routeWrapper,
};

const zeplinLink =
  'https://app.zeplin.io/project/60865602084a7012b372e417/screen/60d2c92144ff8a10db3f9774';

ToDo.parameters = {
  zeplinLink,
};

InProgress.parameters = {
  zeplinLink,
};

Completed.parameters = {
  zeplinLink,
};

Returned.parameters = {
  zeplinLink,
};

Rejected.parameters = {
  zeplinLink,
};

const TableCellContainer = styled.div`
  width: 224px;
  padding: 24px;
  background-color: ${({ theme }) => theme.background.primary};
  border: 1px ${({ theme }) => theme.background.secondary} solid;
`;
