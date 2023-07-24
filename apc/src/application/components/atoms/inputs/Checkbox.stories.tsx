import React, { useState } from 'react';

import { StoryFC } from '$application/components/StoryFC';

import { Checkbox, CheckboxProps } from './CheckBox';

export default {
  title: 'Atoms / Controls / Checkbox',
  component: Checkbox,
  parameters: {
    zeplinLink:
      'https://app.zeplin.io/project/60a1f710d2773f25c226fd39/screen/60ac8090e4f60f2a696866c2',
  },
};

export const Default: StoryFC<CheckboxProps> = (args) => {
  const [isChecked, setIsChecked] = useState(args.isChecked);

  const onChange = () => {
    setIsChecked(!isChecked);
    args.onChange?.();
  };

  return <Checkbox {...args} isChecked={isChecked} onChange={onChange} />;
};

Default.args = {
  id: 'simple-checkbox',
  label: 'Label',
  isChecked: false,
};

export const Disabled = Default.bind({});

Disabled.args = {
  id: 'simple-checkbox',
  label: 'Label',
  disabled: true,
  isChecked: false,
};

export const NoLabel = Default.bind({});

NoLabel.args = {
  id: 'simple-checkbox',
  isChecked: false,
};
