import { GetStaticProps } from 'next';

import ComingSoon from '$application/components/pages/ComingSoonGeneral';

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    description:
      'Search and manage all the institutes which researchers are affiliated with.',
    pageLayout: 'Management',
    breadcrumbs: [
      {
        title: 'Dashboard',
        href: '/management/dashboard',
      },
      {
        title: 'Institutes',
        href: '/management/institutes',
      },
    ],
  },
});

export default ComingSoon;
