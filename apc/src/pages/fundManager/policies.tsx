import { GetStaticProps } from 'next';

import FundManagerPolicies from '$application/components/pages/FundManagerPolicies';
import { ManagementPageProps } from '$application/lib/pageProps';

export const getStaticProps: GetStaticProps<ManagementPageProps> = async () => ({
  props: {
    description: "Search and manage your fund's policies.",
    pageLayout: 'FundManager',
    breadcrumbs: [
      {
        title: 'Policies',
        href: '/fundManager/policies',
      },
    ],
  },
});

export default FundManagerPolicies;
