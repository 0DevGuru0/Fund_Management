import { GetStaticProps } from 'next';

import ManagementPolicies from '$application/components/pages/ManagementPolicies';
import { ManagementPageProps } from '$application/lib/pageProps';

export const getStaticProps: GetStaticProps<ManagementPageProps> = async () => {
  return {
    props: {
      pageLayout: 'Management',
      breadcrumbs: [
        {
          title: 'Policies',
          href: '/management/policies',
        },
      ],
    },
  };
};

export default ManagementPolicies;
