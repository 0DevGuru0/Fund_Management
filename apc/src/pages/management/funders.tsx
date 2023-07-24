import { GetStaticProps } from 'next';

import ComingSoon from '$application/components/pages/ComingSoonGeneral';

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    description: 'Search and manage all funders and their roles and meta data.',
    pageLayout: 'Management',
    breadcrumbs: [
      {
        title: 'Dashboard',
        href: '/management/dashboard',
      },
      {
        title: 'Funders',
        href: '/management/funders',
      },
    ],
  },
});

export default ComingSoon;
