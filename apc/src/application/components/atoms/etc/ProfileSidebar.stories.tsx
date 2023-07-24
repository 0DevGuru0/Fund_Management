import { ProfileSidebar } from './ProfileSidebar';

export default {
  title: 'Atoms / ProfileSidebar',
  component: ProfileSidebar,
  parameters: {
    background: { noPadding: true },
    zeplinLink: [
      {
        name: 'ProfileSidebar',
        link:
          'https://app.zeplin.io/project/607d33693ea7778ad9c2fb17/screen/60d2d051d0bc901382dc8c58',
      },
    ],
    nextRouter: {
      pathname: '/profile',
    },
  },
};

export const SidebarComponent = ProfileSidebar;
