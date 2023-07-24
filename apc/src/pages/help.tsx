import { GetStaticProps } from 'next';

import { PageProps } from '$pages/_layout';

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  return {
    props: {
      pageLayout: 'Docs',
      docsProps: {
        rootID: '6199d9d754e2f9000621d889',
      },
    },
  };
};

const Page = () => {
  return null;
};

export default Page;
