import { GetStaticProps } from 'next';

import ResearcherOverview from '$application/components/pages/ResearcherOverview';

export const getStaticProps: GetStaticProps = async () => ({
  props: { pageLayout: 'Researcher' },
});

export default ResearcherOverview;
