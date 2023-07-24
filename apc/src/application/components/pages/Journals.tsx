import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai/utils';
import { GetStaticProps, NextPage } from 'next';

import PageTab from '$application/components/pages/Journals/PageTab';

import JournalsGroup from './Journals/JournalsGroup';
import JournalsList from './Journals/JournalsList';
import {
  JournalApiResponse,
  processJournalChartData,
} from './Journals/JournalsList/journalsChartDataProcess';
import { activeJournalsTabAtom, journalsCountAtom, JournalsTabs } from './Journals/store';

export const getStaticProps: GetStaticProps = async () => ({
  props: { pageLayout: 'Management' },
});

const Journals: NextPage = () => {
  const [activeTab, setActiveTab] = useAtom(activeJournalsTabAtom);
  const journalsCount = useAtomValue(journalsCountAtom);

  const journalCountApiResponse: JournalApiResponse[] = [
    { label: 'Active', count: 0 },
    { label: 'Suspended', count: 0 },
  ];

  // TODO: For now, only Active journals are available. We should separate active/inactive in IW-449
  journalCountApiResponse[0].count = journalsCount;

  const journalsCountData = processJournalChartData(journalCountApiResponse);

  return (
    <>
      <PageTab activeTab={activeTab} onToggle={setActiveTab} />
      {activeTab === JournalsTabs.List ? (
        <JournalsList gaugeChartData={journalsCountData} />
      ) : (
        <JournalsGroup gaugeChartData={journalsCountData} />
      )}
    </>
  );
};

export default Journals;
