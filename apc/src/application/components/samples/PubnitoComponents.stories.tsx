import React from 'react';

import { ArrowButton, ShareButton } from '@iin/pubnito-components';
import { action } from '@storybook/addon-actions';

import { StoryFC } from '../StoryFC';

export default {
  title: 'Samples / Pubnito Components',
  component: ArrowButton,
};

export const WithSvgIcon: StoryFC = () => <ArrowButton direction="right" />;

export const WithFontIcon: StoryFC = () => (
  <ShareButton
    open={false}
    handleClick={action}
    title="I Have Font Icon"
    description="Which is Bad"
    bookAddress="https://google.com"
  />
);

WithSvgIcon.parameters = WithFontIcon.parameters = {
  zeplinLink: '',
};
