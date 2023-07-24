import { GetStaticProps } from 'next';

import UserProfile from '$application/components/pages/UserProfile';

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    pageLayout: 'Management',
    breadcrumbs: [
      {
        title: 'Account',
        href: '/management/profile',
      },
    ],
  },
});

export default UserProfile;
