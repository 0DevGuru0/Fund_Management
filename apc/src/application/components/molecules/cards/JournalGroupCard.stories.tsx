import React from 'react';

import styled from 'styled-components';

import { StoryFC } from '$application/components/StoryFC';

import { JournalGroupCard, JournalGroupCardProps } from './JournalGroupCard';

export default {
  title: 'Molecules / Cards / JournalGroupCard',
  component: JournalGroupCard,
  parameters: {
    zeplinLink:
      'https://app.zeplin.io/project/60865602084a7012b372e417/screen/60e1a5718279a710ec0ef264',
  },
};

export const ToDo: StoryFC<JournalGroupCardProps> = (args) => {
  return (
    <CardContainer>
      <JournalGroupCard {...args} />
    </CardContainer>
  );
};

export const LongText = ToDo.bind({});
export const Suspended = ToDo.bind({});
export const Restricted = ToDo.bind({});

const sampleDate = new Date(2021, 2, 28);
const formattedDate = sampleDate.toLocaleString('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

ToDo.args = {
  id: '1',
  label: 'Active',
  title: 'Provide a 50% discount code for science',
  journalsCount: 3200,
  moreActions: true,
  createdAt: formattedDate,
};

Suspended.args = {
  id: '2',
  label: 'Suspended',
  title: 'Discount code for Engineering',
  journalsCount: 2,
  createdAt: '15 Mar 2021',
};

Restricted.args = {
  id: '3',
  label: 'Active',
  title: 'Top Journals 2021',
  journalsCount: 1,
  restricted: true,
  createdAt: formattedDate,
};

LongText.args = {
  id: '1',
  label: 'Active',
  title:
    'Provide a 50% discount code for science article in your idea in order to  make it real with less budget effort',
  journalsCount: 3200,
  moreActions: true,
  createdAt: formattedDate,
};

const CardContainer = styled.div`
  width: 500px;
  padding: 24px;
  background-color: ${({ theme }) => theme.background.primary};
`;
