import { GetServerSideProps } from 'next';

import { getQueryParams } from '$application/components/pages/Report/util/getQueryParams';
import ReportResult from '$application/components/pages/ReportResult';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryParams = getQueryParams(ctx.query);

  return {
    props: {
      ...queryParams,
      description:
        "You'll have extensive reports on all system activity here. This page will cover wide range of reports from total budget allocation by Publisher to total Vouchers allocated to researchers of an institute.",
      breadcrumbs: [
        {
          title: 'Reports',
          href: '/fundManager/reports',
        },
        {
          title: 'Result',
          href: '/fundManager/reports/result',
        },
      ],
    },
  };
};

export default ReportResult;
