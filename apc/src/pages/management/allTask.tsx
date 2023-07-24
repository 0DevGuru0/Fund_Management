import { GetStaticProps } from 'next';

import ManagementAllTask from '$application/components/pages/ManagementAllTask';
import { ManagementPageProps } from '$application/lib/pageProps';

export const getStaticProps: GetStaticProps<ManagementPageProps> = async () => ({
  props: {
    pageLayout: 'Management',
    breadcrumbs: [
      {
        title: 'All Tasks',
        href: '/management/allTask',
      },
    ],
  },
});

export default ManagementAllTask;
