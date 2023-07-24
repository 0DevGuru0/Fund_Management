import { GetStaticProps } from 'next';

import UserProfile from '$application/components/pages/UserProfile';

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    pageLayout: 'FundFinancialManager',
    breadcrumbs: [
      {
        title: 'Account',
        href: '/fundFinancialManager/profile',
      },
    ],
  },
});

export default UserProfile;
