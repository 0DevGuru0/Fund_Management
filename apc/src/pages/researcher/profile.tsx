import { GetStaticProps } from 'next';

import UserProfile from '$application/components/pages/UserProfile';

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    pageLayout: 'Researcher',
    breadcrumbs: [
      {
        title: 'Dashboard',
        href: '/researcher/overview',
      },
      {
        title: 'Account',
        href: '/researcher/profile',
      },
    ],
  },
});

export default UserProfile;
