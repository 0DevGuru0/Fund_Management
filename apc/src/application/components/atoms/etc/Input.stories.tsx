import React, { useState } from 'react';

import styled from 'styled-components';

import { StoryFC } from '$application/components/StoryFC';

import { Input, InputProps } from './Input';

export default {
  title: 'Atoms / Input',
  component: Input,
  parameters: {
    zeplinLink:
      'https://app.zeplin.io/project/60a1f710d2773f25c226fd39/screen/60ac8034bcea484b4e393b3b',
  },
};

export const Default: StoryFC<InputProps> = (args) => {
  const [value, setValue] = useState(args.value);
  return <StyledInput {...args} value={value} onChange={setValue} />;
};
const StyledInput = styled(Input)`
  width: 500px;
`;

Default.args = {
  value: '',
  label: 'Input',
  placeholder: '',
  errorText: '',
};
