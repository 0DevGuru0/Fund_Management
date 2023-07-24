import React from 'react';

import { StoryFC } from '$application/components/StoryFC';

import ProcessInstanceDetails from './ProcessInstanceDetails';

export default {
  title: 'Pages / Process Instance Details',
  component: ProcessInstanceDetails,
  parameters: { background: { noPadding: true } },
};

export const Management: StoryFC = (args) => {
  return <ProcessInstanceDetails {...args} />;
};

export const Researcher = Management.bind({});

Management.args = {
  pageLayout: 'Management',
};

Researcher.args = {
  pageLayout: 'Researcher',
};

Management.parameters = {
  zeplinLink:
    'https://app.zeplin.io/project/60865602084a7012b372e417/screen/60d2c961ea02f616bd49e505',
};

Researcher.parameters = {
  zeplinLink:
    'https://app.zeplin.io/project/607d33693ea7778ad9c2fb17/screen/60d2cfff6e40b0112c7fc94a',
};
