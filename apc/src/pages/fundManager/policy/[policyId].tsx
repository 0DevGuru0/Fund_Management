import { GetServerSideProps } from 'next';

import FundManagerPolicyDetails from '$application/components/pages/FundManagerPolicyDetails';
import generateQueryString from '$application/lib/generateQueryString';
import { ManagementPageProps } from '$application/lib/pageProps';

interface Props extends ManagementPageProps {
  policyId?: string;
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const policyId = generateQueryString(ctx.query.policyId);

  return {
    props: {
      policyId,
      pageLayout: 'FundManager',
      breadcrumbs: [
        {
          title: 'Policies',
          href: '/fundManager/policies',
        },
        {
          title: 'Policy Detail',
          href: `/fundManager/policy/${policyId}`,
        },
      ],
    },
  };
};

export default FundManagerPolicyDetails;
