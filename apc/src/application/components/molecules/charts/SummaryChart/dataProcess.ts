import { taskToColor } from '$application/lib/taskToColor';

import { IData } from '../nivoCommonTypes';

export interface SummaryApiResponse {
  label: string;
  count: number;
}

export const processSummaryChartData = (summaryData: SummaryApiResponse[]): IData[] => {
  return summaryData.map((data) => ({
    id: data.label,
    color: taskToColor[data.label],
    label: data.label,
    value: data.count,
  }));
};
