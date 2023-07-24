import { GetStaticProps } from 'next';

import UserProfile from '$application/components/pages/UserProfile';

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    pageLayout: 'FundManager',
    breadcrumbs: [
      {
        title: 'Account',
        href: '/fundManager/profile',
      },
    ],
  },
});

export default UserProfile;
