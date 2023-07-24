import React from 'react';

import { ButtonProps } from '@material-ui/core';

import { StoryFC } from '$application/components/StoryFC';

import { Button, IButton } from './Button';

export default {
  title: 'Atoms / Buttons / RegularButton',
  component: Button,
  argTypes: {
    variant: {
      options: ['contained', 'outlined'],
      control: { type: 'radio' },
    },
    color: {
      options: ['default', 'primary', 'secondary'],
      control: { type: 'radio' },
    },
    customSize: {
      options: ['sm', 'md', 'lg', 'xl'],
      control: { type: 'radio' },
    },
    rightIcon: {
      options: ['arrow-right', undefined],
      control: { type: 'radio' },
    },
    leftIcon: {
      options: ['download-cloud', undefined],
      control: { type: 'radio' },
    },
  },
};

export const RegularButton: StoryFC<IButton & ButtonProps> = (args) => {
  return <Button {...args} />;
};

RegularButton.args = {
  disabled: false,
  title: 'Button',
  customSize: 'md',
  variant: 'outlined',
  color: 'secondary',
  hasCircularRadius: false,
  focused: false,
  rightIcon: undefined,
  leftIcon: undefined,
};

RegularButton.parameters = {
  zeplinLink:
    'https://app.zeplin.io/project/60a1f710d2773f25c226fd39/screen/60ac80790f541d73aa599ed2',
};
