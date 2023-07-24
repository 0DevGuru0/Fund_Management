import React, { FC } from 'react';

import { countBy, values } from 'lodash';
import styled from 'styled-components';

import AwardSVG from '$application/assets/icons/award.svg';
import ClockSVG from '$application/assets/icons/clock.svg';
import LoadingSVG from '$application/assets/icons/loading.svg';
import EditSVG from '$application/assets/icons/publisher.svg';
import { Gauge, GaugeProps } from '$application/components/atoms/etc/Gauge';
import { GetProcessInstances200Item } from '$application/lib/generated/apcApi.schemas';
import { taskToColor } from '$application/lib/taskToColor';

import { getProcessInstanceStatus } from './getProcessInstanceRows';

interface Props {
  processInstances?: GetProcessInstances200Item[];
  username?: string;
}

const defaultInstances: GaugeProps[] = [
  {
    count: 0,
    type: 'Awaiting',
    label: 'All ',
    subtitle: 'Submitted By You',
    color: taskToColor.Awaiting,
    icon: <LoadingSVG />,
  },
  {
    count: 0,
    type: 'In Progress',
    label: 'In Progress ',
    subtitle: 'Waiting for Funders',
    color: taskToColor['In Progress'],
    icon: <ClockSVG />,
  },
  {
    count: 0,
    type: 'Pending',
    label: 'Pending',
    subtitle: 'Need your work',
    color: taskToColor.Returned,
    icon: <EditSVG />,
  },
  {
    count: 0,
    type: 'Completed',
    label: 'Completed',
    subtitle: 'Approved/Rejected',
    color: taskToColor.Completed,
    icon: <AwardSVG />,
  },
];

const gageDataMapper = (
  processInstances: GetProcessInstances200Item[],
  username?: string,
): GaugeProps[] => {
  const instances = countBy(
    processInstances.map((processInstance) =>
      getProcessInstanceStatus(processInstance, username),
    ),
  );

  const updatedInstances = defaultInstances;

  updatedInstances.find((o) => o.type === 'Completed')!.count = instances.Completed ?? 0;

  updatedInstances.find((o) => o.type === 'Pending')!.count = instances.Pending ?? 0;

  updatedInstances.find((o) => o.type === 'In Progress')!.count =
    instances['In Progress'] ?? 0;

  updatedInstances.find((o) => o.type === 'Awaiting')!.count = values(instances).reduce(
    (acc, curr) => acc + curr,
    0,
  );

  return updatedInstances;
};

export const ResearcherOverviewGauge: FC<Props> = ({ processInstances, username }) => (
  <GaugeContainer>
    {gageDataMapper(processInstances ?? [], username).map((item, key) => (
      <Gauge key={key} {...item} />
    ))}
  </GaugeContainer>
);

export default Gauge;

const GaugeContainer = styled.div`
  display: grid;
  grid-column-gap: 24px;
  grid-template-columns: repeat(4, minmax(100px, 300px));
`;
