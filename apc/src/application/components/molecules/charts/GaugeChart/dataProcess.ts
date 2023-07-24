import { IData } from '../nivoCommonTypes';

export interface GaugeChartData {
  total: number;
  data: IData[][];
}

export const defaultGaugeChartData: GaugeChartData = {
  total: 0,
  data: [],
};
