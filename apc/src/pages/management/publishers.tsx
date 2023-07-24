import { GetStaticProps } from 'next';

import ComingSoon from '$application/components/pages/ComingSoonGeneral';

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    description: 'Search and manage all registered publisher and add new ones.',
    pageLayout: 'Management',
    breadcrumbs: [
      {
        title: 'Dashboard',
        href: '/management/dashboard',
      },
      {
        title: 'Publishers',
        href: '/management/publishers',
      },
    ],
  },
});

export default ComingSoon;
