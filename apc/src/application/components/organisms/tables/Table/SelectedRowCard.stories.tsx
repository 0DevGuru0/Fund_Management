import React from 'react';

import styled from 'styled-components';

import { StoryFC } from '$application/components/StoryFC';

import { SelectedRowCard, SelectedRowCardProps } from './SelectedRowCard';

export default {
  title: 'Organisms / Table / SelectedRowCard',
  component: SelectedRowCard,
  parameters: { background: { noPadding: true } },
};

export const NoGroups: StoryFC<SelectedRowCardProps> = (args) => {
  return (
    <Container>
      <SelectedRowCard {...args} />
    </Container>
  );
};

NoGroups.args = {
  groupExists: false,
  showGroupButton: true,
};

export const GroupExists = NoGroups.bind({});
GroupExists.args = {
  groupExists: true,
  showGroupButton: true,
};

NoGroups.parameters = {
  zeplinLink:
    'https://app.zeplin.io/project/60865602084a7012b372e417/screen/60e1a443b2dcd410f85fe3e6',
};

GroupExists.parameters = {
  zeplinLink:
    'https://app.zeplin.io/project/60865602084a7012b372e417/screen/60e1a44b32e9fb1284ee47cb',
};

const Container = styled.div`
  width: calc(100% - 70px);
`;
