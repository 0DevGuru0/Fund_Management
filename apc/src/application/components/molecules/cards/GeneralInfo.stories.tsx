import React from 'react';

import dayjs from 'dayjs';
import styled from 'styled-components';

import { StoryFC } from '$application/components/StoryFC';

import { GeneralInfo, GeneralInfoProps } from './GeneralInfo';

export default {
  title: 'Molecules / Cards / GeneralInfo',
  component: GeneralInfo,
  parameters: {
    background: { noPadding: true },
  },
};

interface IGeneralInfo extends Omit<GeneralInfoProps, 'additionalInfo'> {
  type: 'Researcher' | 'Management';
}

export const ResearcherGeneralInfo: StoryFC<IGeneralInfo> = (args) => {
  const formattedDate = dayjs(new Date(2021, 3, 10)).format('DD MMM YYYY');
  const additionalInfo = [
    ...(args.type === 'Management'
      ? [
          {
            label: 'Created by',
            value: 'Sample',
          },
          {
            label: 'Affiliation',
            value: 'Oxford University',
          },
          {
            label: 'ORCID',
            value: 'https://orcid.com/researcher/2392983412124',
            isLink: true,
          },
        ]
      : []),
    {
      label: 'Publisher',
      value: 'Institution of Federal de Educator',
    },
    {
      label: 'Journal',
      value: '#Tear: Revista de Educação',
    },
    {
      label: 'Price',
      value: '$ 2,500',
    },
    {
      label: 'Subject Category',
      value: subjectArray.join(', '),
    },
    {
      label: 'Subject Area',
      value: 'Management Information System',
    },
    {
      label: 'Creation Date',
      value: formattedDate,
    },
  ];

  return (
    <Container>
      <GeneralInfo {...args} additionalInfo={additionalInfo} />
    </Container>
  );
};

export const ManagementGeneralInfo = ResearcherGeneralInfo.bind({});

const subjectArray: string[] = ['Business', 'Management', 'Science'];

const description = 'Publisher: Elsevier, Journal: AACE Clinical Case Reports, Price: 10';

const attachment = {
  name: 'sdf43434a53s5px10x84e273uwe3.pdf',
  path: 'https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf',
  volume: '324 KB',
  createdDate: '5 seconds ago',
  type: 'application/pdf',
};

ResearcherGeneralInfo.args = {
  attachment,
  description,
  type: 'Researcher',
};

ManagementGeneralInfo.args = {
  attachment,
  description,
  type: 'Management',
};

ResearcherGeneralInfo.parameters = {
  zeplinLink:
    'https://app.zeplin.io/project/607d33693ea7778ad9c2fb17/screen/60d2cfff6e40b0112c7fc94a',
};

ManagementGeneralInfo.parameters = {
  zeplinLink:
    'https://app.zeplin.io/project/60865602084a7012b372e417/screen/60d2c9bba78d2a15639f9ccf',
};

const Container = styled.div`
  width: inherit;
  margin-right: 40px;
  background-color: ${({ theme }) => theme.background.secondary};
`;
