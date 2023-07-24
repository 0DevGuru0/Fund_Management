/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';

import styled from 'styled-components';

import { StoryFC } from '$application/components/StoryFC';

import { JournalTitle, JournalTitleProps } from './JournalTitle';

export default {
  title: 'Organisms / Table / JournalTitle',
  component: JournalTitle,
};

export const ShortTitle: StoryFC<JournalTitleProps> = (args) => {
  const [isChecked, setSelected] = useState(args.isChecked);
  const [isHovered, setHovered] = useState(args.isHovered);

  const handleCheckboxChange = (newState: boolean, taskKey: string) => {
    setSelected(newState);
    args.onToggle(newState, taskKey);
  };

  return (
    <MainContainer>
      <TableCellContainer
        onMouseOut={() => setHovered(false)}
        onMouseOver={() => setHovered(true)}
      >
        <JournalTitle
          {...args}
          isChecked={isChecked}
          isHovered={isHovered}
          onToggle={(newState, taskKey) => handleCheckboxChange(newState, taskKey)}
        />
      </TableCellContainer>
    </MainContainer>
  );
};

export const LongTitle = ShortTitle.bind({});
export const CustomCover = ShortTitle.bind({});

ShortTitle.args = {
  id: '1',
  index: 0,
  width: 450,
  isHovered: false,
  isChecked: false,
  title: 'IEEE Access',
  journalType: 'Open Access',
};

LongTitle.args = {
  id: '2',
  index: 10,
  width: 450,
  isChecked: false,
  isHovered: false,
  journalType: 'Open Access',
  title: 'Interdisciplinary Studies in the Long Nineteenth Century',
};

CustomCover.args = {
  id: '3',
  index: 20,
  width: 450,
  isChecked: false,
  isHovered: false,
  journalType: 'Open Access',
  title: 'Springer Lecture Notes in Computer Science ',
  thumbnail:
    'https://media.springernature.com/w306/springer-static/cover/book/978-3-030-59830-3.jpg',
};

const zeplinLink =
  'https://app.zeplin.io/project/60865602084a7012b372e417/screen/60d2ca6b1a0da6115a8376e3';

ShortTitle.parameters = {
  zeplinLink,
};

LongTitle.parameters = {
  zeplinLink,
};

CustomCover.parameters = {
  zeplinLink,
};

const MainContainer = styled.div`
  height: 114px;
  width: max-content;
`;

const TableCellContainer = styled.div`
  padding: 24px 36px 24px 24px;
  background-color: ${({ theme }) => theme.background.primary};
  border: 1px ${({ theme }) => theme.background.secondary} solid;
`;
