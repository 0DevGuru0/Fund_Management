import React, { useState } from 'react';

import styled from 'styled-components';

import { StoryFC } from '$application/components/StoryFC';

import { SortBy, SortByProps } from './SortBy';

export default {
  title: 'Organisms / Table / SortBy',
  component: SortBy,
  parameters: {
    zeplinLink:
      'https://app.zeplin.io/project/60a1f710d2773f25c226fd39/screen/60ac8034bcea484b4e393b3b',
  },
};

export const Default: StoryFC<SortByProps> = (args) => {
  const [selectedOption, setSelectedOption] = useState(args.selectedOption);

  const handleSelectOption = (item: string) => {
    setSelectedOption(item);
    args.onSelect(item);
  };

  return (
    <Container>
      <SortBy
        {...args}
        selectedOption={selectedOption}
        onSelect={(newIndex) => handleSelectOption(newIndex)}
      />
    </Container>
  );
};

Default.args = {
  selectedOption: 'Recent',
  options: ['Recent', 'Title', 'Task Status'],
};

export const LongOptionTitle = Default.bind({});
LongOptionTitle.args = {
  selectedOption: 'Recent',
  options: ['Recent', 'Title', 'Task Status', 'Name and Family A-Z'],
};

const Container = styled.div`
  margin: 0 40px;
`;
