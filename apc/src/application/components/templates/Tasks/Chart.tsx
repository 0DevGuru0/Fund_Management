import React, { useContext } from 'react';

import { IData } from '$application/components/molecules/charts/nivoCommonTypes';
import { SummaryChart } from '$application/components/molecules/charts/SummaryChart';
import { GetTasksSummary200Item } from '$application/lib/generated/apcApi.schemas';
import { taskToColor } from '$application/lib/taskToColor';

import { summaryChartProps } from './Chart/config';
import { TasksContext } from './TasksContext';

const getPopulatedSummary = (summaries: any[]): IData[] =>
  summaries.map((summary) => ({
    id: summary.label,
    label: summary.label,
    value: summary.count,
    color: taskToColor[summary.label],
  }));

interface TasksSummary {
  isLoading: boolean;
  summaries?: GetTasksSummary200Item[];
}

export interface ChartProps {
  tasksSummary: TasksSummary;
}

export const Chart = () => {
  const { tasksSummary } = useContext(TasksContext);
  return (
    <SummaryChart
      {...summaryChartProps}
      data={
        !tasksSummary.isLoading && tasksSummary.summaries
          ? getPopulatedSummary(tasksSummary.summaries)
          : []
      }
    />
  );
};

export default Chart;
