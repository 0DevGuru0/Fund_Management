import { GetStaticProps } from 'next';

import ComingSoon from '$application/components/pages/ComingSoonGeneral';

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    description: 'Search and manage all registered publisher and add new ones.',
    pageLayout: 'FundManager',
    breadcrumbs: [
      {
        title: 'Publishers',
        href: '/fundManager/publishers',
      },
    ],
  },
});

export default ComingSoon;
