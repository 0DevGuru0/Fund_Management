import React, { useState } from 'react';

import styled from 'styled-components';

import { StoryFC } from '$application/components/StoryFC';

import { SimpleTitle, SimpleTitleProps } from './SimpleTitle';

export default {
  title: 'Organisms / Table / SimpleTitle',
  component: SimpleTitle,
  parameters: {
    zeplinLink:
      'https://app.zeplin.io/project/60a1f710d2773f25c226fd39/screen/60ac80d5884c16a18d2b7f44',
  },
};

export const ShortText: StoryFC<SimpleTitleProps> = (args) => {
  const [isChecked, toggleSelection] = useState(args.isChecked);
  const handleCheckboxChange = (newState: boolean, taskKey: string) => {
    toggleSelection(newState);
    args.onToggle(newState, taskKey);
  };

  return (
    <MainContainer>
      <TableCellContainer>
        <SimpleTitle
          {...args}
          isChecked={isChecked}
          onToggle={(newState, taskKey) => handleCheckboxChange(newState, taskKey)}
        />
      </TableCellContainer>
    </MainContainer>
  );
};

export const LongText = ShortText.bind({});
export const NoTaskKey = ShortText.bind({});

ShortText.args = {
  index: 1,
  id: '1',
  isChecked: false,
  title: 'Territories Attractiveness Volume',
  taskKey: '1',
  width: 450,
  isHovered: true,
};

LongText.args = {
  index: 10,
  id: '1',
  isChecked: false,
  title:
    'New Metropolitan Perspectives, Knowledge Dynamics the Territories Attractiveness Volume 1',
  taskKey: '1234567890',
  width: 450,
  isHovered: false,
};

NoTaskKey.args = {
  id: '1',
  index: 1,
  width: 450,
  isHovered: true,
  isChecked: false,
  title: 'A Simple Message Template',
};

const MainContainer = styled.div`
  height: 114px;
  width: 451px;
`;

const TableCellContainer = styled.div`
  padding: 24px 36px 24px 24px;
  background-color: ${({ theme }) => theme.background.primary};
  border: 1px ${({ theme }) => theme.background.secondary} solid;
`;
