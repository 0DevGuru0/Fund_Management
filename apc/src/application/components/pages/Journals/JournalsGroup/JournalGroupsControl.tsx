import React, { FC } from 'react';

import { useUpdateAtom } from 'jotai/utils';
import styled, { useTheme } from 'styled-components';

import { Button } from '$application/components/atoms/buttons/Button';
import { GaugeChart } from '$application/components/molecules/charts/GaugeChart';
import { GaugeChartData } from '$application/components/molecules/charts/GaugeChart/dataProcess';
import { GetJournalGroups200Item } from '$application/lib/generated/apcApi.schemas';

import { showCreateGroupAtom } from '../store';

interface JournalGroupsControlProps {
  gaugeChartData: GaugeChartData;
  journalGroups?: GetJournalGroups200Item[];
}

export const JournalGroupsControl: FC<JournalGroupsControlProps> = ({
  journalGroups,
}) => {
  const setShowCreateGroup = useUpdateAtom(showCreateGroupAtom);
  const theme = useTheme();

  // TODO: Fix this when journal groups had isActive
  const actives = journalGroups?.length ?? 0;
  const chartData = {
    total: actives,
    data: [
      [
        { id: 'Active', label: 'Active', value: actives, color: theme.taskPalette.green },
        { id: 'Others', label: 'Others', value: 0, color: theme.border },
      ],
      [
        { id: 'Suspended', label: 'Suspended', value: 0, color: theme.taskPalette.red },
        { id: 'Others', label: 'Others', value: actives, color: theme.border },
      ],
    ],
  };

  return (
    <Container>
      <ChartContainer>
        <GaugeChart items={chartData} />
      </ChartContainer>
      <AddButton
        color="primary"
        leftIcon="plus"
        customSize="md"
        title="Add Group"
        variant="contained"
        onClick={() => setShowCreateGroup(true)}
      />
    </Container>
  );
};

export default JournalGroupsControl;

const Container = styled.div`
  display: flex;
  margin-bottom: 36px;
`;

const AddButton = styled(Button)`
  width: 160px;
  height: 48px;
`;

const ChartContainer = styled.div`
  flex: 1;
`;
