import React, { FC } from 'react';

import styled from 'styled-components';

import { GaugeChart } from '$application/components/molecules/charts/GaugeChart';

import { processJournalChartData } from '../Journals/JournalsList/journalsChartDataProcess';

interface JournalGroupChartProps {
  activeCount: number;
  suspendedCount: number;
}

export const JournalGroupChart: FC<JournalGroupChartProps> = ({
  activeCount,
  suspendedCount,
}) => {
  const generatedApiResponse = [
    { label: 'Active', count: activeCount },
    { label: 'Suspended', count: suspendedCount },
  ];

  const gaugeChartData = processJournalChartData(generatedApiResponse);

  return (
    <Container>
      <GaugeChart
        items={gaugeChartData}
        totalLabel={activeCount === 1 ? 'Journal' : 'Journals'}
      />
    </Container>
  );
};

export default JournalGroupChart;

const Container = styled.div`
  margin-bottom: 36px;
`;
