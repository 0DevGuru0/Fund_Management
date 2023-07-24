import React from 'react';

import { action } from '@storybook/addon-actions';
import dayjs from 'dayjs';
import styled from 'styled-components';

import { StoryFC } from '$application/components/StoryFC';

import {
  ProcessInstanceDetails,
  ProcessInstanceDetailsProps,
} from './ProcessInstanceDetails';

export default {
  title: 'Molecules / Cards / ProcessInstanceDetails',
  component: ProcessInstanceDetails,
  parameters: {
    background: { noPadding: true },
  },
};

export const ResearcherDefault: StoryFC<Omit<ProcessInstanceDetailsProps, 'steps'>> = (
  args,
) => {
  const steps = [
    {
      id: '2j21-2321210-1231',
      type: 'userTask',
      name: 'Submit Proof',
      title: 'Submit Proof',
      isDone: false,
      dueDate: dayjs().subtract(8, 'months').toString(),
      description: 'Request additional information for Oxford University',
      onCheckAndDo: action('onCheckAndDo'),
    },
    {
      id: '4j21-2321210-1231',
      type: 'serviceTask',
      name: 'Update Status',
      title: 'Check Article',
      isDone: true,
      descriptionDate: dayjs().subtract(8, 'months').toString(),
      description: 'Submitted article by you',
    },
    {
      id: '5j21-2321210-1231',
      type: 'userTask',
      name: 'Start',
      title: 'Start Process',
      isDone: true,
      descriptionDate: dayjs().subtract(8, 'months').toString(),
      onPDFClick: action('onPDFClick'),
    },
  ];

  return (
    <Container>
      <ProcessInstanceDetails {...args} steps={steps} />
    </Container>
  );
};

ResearcherDefault.args = {
  summary: {
    publisher: 'Instituto Federal de Educação',
    journal: '#Tear: Revista de Educação, ',
    price: 2500,
    subjectCategory: 'Business, Management ',
    mainSubject: 'Management Information System',
    currency: 'usd',
  },
};

ResearcherDefault.parameters = {
  zeplinLink:
    'https://app.zeplin.io/project/607d33693ea7778ad9c2fb17/screen/60d2d0181662da1664f4da83',
};

const Container = styled.div`
  box-sizing: border-box;
  padding: 50px;
  background-color: ${({ theme }) => theme.background.secondary};
`;
