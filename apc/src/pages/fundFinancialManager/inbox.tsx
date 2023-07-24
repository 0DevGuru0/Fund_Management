import { GetStaticProps } from 'next';

import FundManagerInbox from '$application/components/pages/FundManagerInbox';

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    pageLayout: 'FundFinancialManager',
    breadcrumbs: [
      {
        title: 'Inbox',
        href: '/fundFinancialManager/inbox',
      },
    ],
  },
});

export default FundManagerInbox;
