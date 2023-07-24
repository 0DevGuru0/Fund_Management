import ManagementLayout from './ManagementLayout';

export default {
  title: 'Templates / Management',
  component: ManagementLayout,
  parameters: {
    background: { noPadding: true },
    zeplinLink:
      'https://app.zeplin.io/project/60a1f710d2773f25c226fd39/screen/60a1faaaf3361d2902bd96a3',
    nextRouter: {
      pathname: '/dashboard',
    },
  },
};

export const Management = ManagementLayout;
