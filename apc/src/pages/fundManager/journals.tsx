import { GetStaticProps } from 'next';

import Journals from '$application/components/pages/Journals';

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    pageLayout: 'FundManager',
    breadcrumbs: [
      {
        title: 'Journals',
        href: '/fundManager/journals',
      },
    ],
  },
});

export default Journals;
