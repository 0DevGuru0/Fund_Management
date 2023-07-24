import React from 'react';

import styled from 'styled-components';

import AwardSVG from '$application/assets/icons/award.svg';
import ClockSVG from '$application/assets/icons/clock.svg';
import LoadingSVG from '$application/assets/icons/loading.svg';
import EditSVG from '$application/assets/icons/publisher.svg';
import { StoryFC } from '$application/components/StoryFC';
import { taskToColor } from '$application/lib/taskToColor';

import { Gauge, GaugeProps } from './Gauge';

export default {
  title: 'Atoms / Gauge',
  component: Gauge,
};

export const Awaiting: StoryFC<GaugeProps> = (args) => {
  return (
    <GaugeContainer>
      <Gauge {...args} />
    </GaugeContainer>
  );
};

export const InProgress = Awaiting.bind({});
export const Pending = Awaiting.bind({});
export const Approved = Awaiting.bind({});

Awaiting.args = {
  count: 0,
  type: 'Awaiting',
  label: 'All ',
  subtitle: 'Submitted By You',
  color: taskToColor.Awaiting,
  icon: <LoadingSVG />,
};

InProgress.args = {
  count: 0,
  type: 'In Progress',
  label: 'In Progress ',
  subtitle: 'Waiting for Funders',
  color: taskToColor['In Progress'],
  icon: <ClockSVG />,
};

Pending.args = {
  count: 0,
  type: 'Pending',
  label: 'Pending',
  subtitle: 'Need your work',
  color: taskToColor.Returned,
  icon: <EditSVG />,
};

Approved.args = {
  count: 0,
  type: 'Completed',
  label: 'Completed',
  subtitle: 'Request Approved or Rejected',
  color: taskToColor.Completed,
  icon: <AwardSVG />,
};

const zeplinLink =
  'https://app.zeplin.io/project/607d33693ea7778ad9c2fb17/screen/60d2d3dabccf3313770d5742';

Awaiting.parameters = {
  zeplinLink,
};

InProgress.parameters = {
  zeplinLink,
};

Pending.parameters = {
  zeplinLink,
};

Approved.parameters = {
  zeplinLink,
};

const GaugeContainer = styled.div`
  width: 271px;
  height: 186px;
  margin: 24px;
`;
