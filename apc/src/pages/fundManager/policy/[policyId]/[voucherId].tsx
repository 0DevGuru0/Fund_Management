import { GetServerSideProps } from 'next';

import VoucherDetails from '$application/components/pages/VoucherDetails';
import generateQueryString from '$application/lib/generateQueryString';
import { ManagementPageProps } from '$application/lib/pageProps';

interface Props extends ManagementPageProps {
  policyId?: string;
  voucherId?: string;
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const policyId = generateQueryString(ctx.query.policyId);
  const voucherId = generateQueryString(ctx.query.voucherId);

  return {
    props: {
      policyId,
      voucherId,
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
        {
          title: 'Voucher Detail',
          href: `/fundManager/policy/${policyId}/${voucherId}`,
        },
      ],
    },
  };
};

export default VoucherDetails;
