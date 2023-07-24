import ProfileAvatar from './ProfileAvatar';

export default {
  title: 'Atoms / ProfileAvatar',
  component: ProfileAvatar,
  parameters: {
    background: { noPadding: true },
    zeplinLink: [
      {
        name: 'ProfileAvatar',
        link:
          'https://app.zeplin.io/project/60a1f710d2773f25c226fd39/screen/60ac804097ca588fc8241e86',
      },
    ],
    nextRouter: {
      pathname: '/profile-logo',
    },
  },
};

export const Default = ProfileAvatar;
