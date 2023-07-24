import React from 'react';

import { StoryFC } from '$application/components/StoryFC';

import { Footer } from './Footer';
import footerConfig from './Footer/footer.config';

export default {
  title: 'Atoms / Footer',
  component: Footer,
  parameters: { background: { noPadding: true } },
};

export const FooterComponent: StoryFC = (args) => {
  return <Footer {...args} />;
};

FooterComponent.args = {
  narrowPadding: true,
  footerConfig,
  context: 'Admin',
};

FooterComponent.parameters = {
  zeplinLink:
    'https://app.zeplin.io/project/60a1f710d2773f25c226fd39/screen/60a1fa8087bc552669e49ed2',
};
