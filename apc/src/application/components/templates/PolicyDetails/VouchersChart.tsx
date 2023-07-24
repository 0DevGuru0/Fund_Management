import React, { FC } from 'react';

import styled from 'styled-components';

import { IData } from '$application/components/molecules/charts/nivoCommonTypes';
import { SummaryChart } from '$application/components/molecules/charts/SummaryChart';
import { TaskNameNormalizer, taskToColor } from '$application/lib/taskToColor';

import { vouchersChartConfig } from './config';

interface VouchersChartProps {
  availableCount: number;
  suspendedCount: number;
  reservedCount: number;
  allocatedCount: number;
}

const VouchersChart: FC<VouchersChartProps> = ({
  reservedCount,
  allocatedCount,
  availableCount,
  suspendedCount,
}) => {
  const data: IData[] = [
    {
      id: TaskNameNormalizer.AVAILABLE,
      label: TaskNameNormalizer.AVAILABLE,
      value: availableCount,
      color: taskToColor.Available,
    },
    {
      id: TaskNameNormalizer.SUSPENDED,
      label: TaskNameNormalizer.SUSPENDED,
      value: suspendedCount,
      color: taskToColor.Suspended,
    },
    {
      id: TaskNameNormalizer.RESERVED,
      label: TaskNameNormalizer.RESERVED,
      value: reservedCount,
      color: taskToColor.Reserved,
    },
    {
      id: TaskNameNormalizer.ALLOCATED,
      label: TaskNameNormalizer.ALLOCATED,
      value: allocatedCount,
      color: taskToColor.Allocated,
    },
  ];

  return (
    <Container>
      <SummaryChart {...vouchersChartConfig} data={data} />
    </Container>
  );
};

const Container = styled.div`
  box-sizing: border-box;
  width: 238px;
  height: fit-content;
  padding: 24px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.background.secondary};
`;

export default VouchersChart;
