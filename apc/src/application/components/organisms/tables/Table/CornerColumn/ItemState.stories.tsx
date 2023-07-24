import React, { useState } from 'react';

import styled from 'styled-components';

import { StoryFC } from '$application/components/StoryFC';

import { ItemState, ItemStateProps } from './ItemState';

export default {
  title: 'Organisms / Table / ItemState',
  component: ItemState,
};

export const Active: StoryFC<ItemStateProps> = (args) => {
  const [isHovered, setHovered] = useState(args.isHovered);

  return (
    <TableCellContainer
      onMouseOut={() => setHovered(false)}
      onMouseOver={() => setHovered(true)}
    >
      <ItemState {...args} isHovered={isHovered} />
    </TableCellContainer>
  );
};

export const Suspended = Active.bind({});

Active.args = {
  label: 'Active',
  isHovered: false,
};

Suspended.args = {
  label: 'Suspended',
  isHovered: false,
};

const zeplinLink =
  'https://app.zeplin.io/project/60865602084a7012b372e417/screen/60d2ca6b1a0da6115a8376e3';

Active.parameters = {
  zeplinLink,
};

Suspended.parameters = {
  zeplinLink,
};

const TableCellContainer = styled.div`
  width: 224px;
  padding: 24px;
  max-height: 28px;
  background-color: ${({ theme }) => theme.background.primary};
  border: 1px ${({ theme }) => theme.background.secondary} solid;
`;
