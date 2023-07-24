import { GetStaticProps } from 'next';

import Journals from '$application/components/pages/Journals';

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    pageLayout: 'Management',
    breadcrumbs: [
      {
        title: 'Journals',
        href: '/management/journals',
      },
    ],
  },
});

export default Journals;
