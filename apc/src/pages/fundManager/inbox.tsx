import { GetStaticProps } from 'next';

import FundManagerInbox from '$application/components/pages/FundManagerInbox';
import { ManagementPageProps } from '$application/lib/pageProps';

export const getStaticProps: GetStaticProps<ManagementPageProps> = async () => ({
  props: {
    pageLayout: 'FundManager',
    authorizeRole: 'FundManager',
    breadcrumbs: [
      {
        title: 'Inbox',
        href: '/fundManager/inbox',
      },
    ],
  },
});

export default FundManagerInbox;
