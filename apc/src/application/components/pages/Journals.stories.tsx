import { rest } from 'msw';

import Journals from './Journals';
import {
  processJournalChartData,
  sampleJournalsApiResults,
} from './Journals/JournalsList/journalsChartDataProcess';

const journalsMockServiceAddress = 'https://sample.com/api/journals/';

export default {
  title: 'Pages / Journals',
  component: Journals,
  parameters: {
    background: { noPadding: true },
    zeplinLink:
      'https://app.zeplin.io/project/60865602084a7012b372e417/screen/60e1a443b2dcd410f85fe3e6',
    msw: [
      rest.get(`${journalsMockServiceAddress}`, (_req, res, ctx) =>
        res(
          ctx.delay(1000),
          ctx.json({
            results: processJournalChartData(sampleJournalsApiResults),
          }),
        ),
      ),
    ],
  },
};

export const JournalsPage = Journals;
