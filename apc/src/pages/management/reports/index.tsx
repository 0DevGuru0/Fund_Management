import { GetStaticProps } from 'next';

import Report from '$application/components/pages/Report';

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    description:
      "You'll have extensive reports on all system activity here. This page will cover wide range of reports from total budget allocation by Publisher to total Vouchers allocated to researchers of an institute.",
    pageLayout: 'Management',
    breadcrumbs: [
      {
        title: 'Reports',
        href: '/management/reports',
      },
    ],
  },
});

export default Report;
