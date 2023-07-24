import React from 'react';

import { StoryFC } from '$application/components/StoryFC';

import { RequestSummary, RequestSummaryProps } from './RequestSummary';

export default {
  title: 'Molecules / Cards / ProcessInstanceDetails / RequestSummary',
  component: RequestSummary,
};

export const Default: StoryFC<RequestSummaryProps> = (args) => (
  <RequestSummary {...args} />
);

Default.args = {
  publisher: 'Instituto Federal de Educação',
  journal: '#Tear: Revista de Educação, ',
  price: 2500,
  subjectCategory: 'Business, Management ',
  mainSubject: 'Management Information System',
  currency: 'usd',
};

Default.parameters = {
  zeplinLink:
    'https://app.zeplin.io/project/607d33693ea7778ad9c2fb17/screen/60d2d0181662da1664f4da83',
};
