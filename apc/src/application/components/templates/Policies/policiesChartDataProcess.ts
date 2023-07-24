import { GaugeChartData } from '$application/components/molecules/charts/GaugeChart/dataProcess';
import { IData } from '$application/components/molecules/charts/nivoCommonTypes';
import { getThemes } from '$application/theme/getThemes';

export interface PoliciesApiResponse {
  label: string;
  count: number;
}

const theme = getThemes();

export const processPoliciesChartData = (
  response: PoliciesApiResponse[],
): GaugeChartData => {
  let total = 0;
  const data: IData[][] = [];

  response.forEach((item) => {
    total += item.count;
    data.push([
      {
        id: item.label,
        label: item.label,
        value: item.count,
        color: theme.LightBase.taskPalette[item.label === 'Active' ? 'green' : 'red'],
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
