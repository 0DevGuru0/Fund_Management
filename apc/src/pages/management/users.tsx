import { GetStaticProps } from 'next';

import ComingSoon from '$application/components/pages/ComingSoonGeneral';

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    description:
      'Search and manage all system users and their roles. This includes researchers, publishers, funders, institutes and admins.',
    pageLayout: 'Management',
    breadcrumbs: [
      {
        title: 'Users',
        href: '/management/users',
      },
    ],
  },
});

export default ComingSoon;
