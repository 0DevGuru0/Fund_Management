import React from 'react';

import {
  processJournalChartData,
  sampleJournalsApiResults,
} from '$application/components/pages/Journals/JournalsList/journalsChartDataProcess';

import { GaugeChart } from './GaugeChart';

export default {
  title: 'Molecules / Charts / GaugeChart',
  component: GaugeChart,
  parameters: {
    zeplinLink:
      'https://app.zeplin.io/project/60865602084a7012b372e417/screen/60d2ca6b1a0da6115a8376e3',
  },
};

export const JournalsGaugeChart = () => (
  <GaugeChart items={processJournalChartData(sampleJournalsApiResults)} />
);
