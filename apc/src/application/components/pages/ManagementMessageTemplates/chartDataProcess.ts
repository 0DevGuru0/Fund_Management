import { GaugeChartData } from '$application/components/molecules/charts/GaugeChart/dataProcess';
import { IData } from '$application/components/molecules/charts/nivoCommonTypes';
import { getThemes } from '$application/theme/getThemes';

export interface MessageTemplateCountResponse {
  label: string;
  count: number;
}

const theme = getThemes();

export const processMessageTemplateChartData = (
  total: number,
  response: MessageTemplateCountResponse[],
): GaugeChartData => {
  const data: IData[][] = [];

  response.map((item) => {
    data.push([
      {
        id: item.label,
        label: item.label,
        value: item.count,
        color:
          item.label === 'Available'
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
