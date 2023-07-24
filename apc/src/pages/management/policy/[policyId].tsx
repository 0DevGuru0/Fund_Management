import { GetServerSideProps } from 'next';

import ManagementPolicyDetails from '$application/components/pages/ManagementPolicyDetails';
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
      pageLayout: 'Management',
      breadcrumbs: [
        {
          title: 'Policies',
          href: '/management/policies',
        },
        {
          title: 'Policy Detail',
          href: `/management/policy/${policyId}`,
        },
      ],
    },
  };
};

export default ManagementPolicyDetails;
