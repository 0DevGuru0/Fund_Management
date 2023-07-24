import { GaugeChartData } from '$application/components/molecules/charts/GaugeChart/dataProcess';
import { IData } from '$application/components/molecules/charts/nivoCommonTypes';
import { getThemes } from '$application/theme/getThemes';

export interface JournalApiResponse {
  label: string;
  count: number;
}

export const sampleJournalsApiResults: JournalApiResponse[] = [
  { label: 'Active', count: 7801 },
  { label: 'Suspended', count: 0 },
];

const theme = getThemes();

export const processJournalChartData = (
  response: JournalApiResponse[],
): GaugeChartData => {
  let total = 0;
  const data: IData[][] = [];

  response.map((item) => {
    total += item.count;
  });

  response.map((item) => {
    data.push([
      {
        id: item.label,
        label: item.label,
        value: item.count,
        color:
          item.label === 'Active'
            ? theme.LightBase.taskPalette.green
            : theme.LightBase.taskPalette.red,
      },
      {
        id: 'Others',
        label: 'Others',
        value: total - item.count,
        color: theme.LightBase.palette.grey[300]!,
      },
    ]);
  });

  return {
    total,
    data,
  };
};
