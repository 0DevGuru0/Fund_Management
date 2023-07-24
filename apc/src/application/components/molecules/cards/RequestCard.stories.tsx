import React, { useState } from 'react';

import dayjs from 'dayjs';
import styled from 'styled-components';

import FundSVG from '$application/assets/icons/fund-fill.svg';
import { StoryFC } from '$application/components/StoryFC';

import { RequestCard, RequestCardProps } from './RequestCard';

export default {
  title: 'Molecules / Cards / RequestCard',
  component: RequestCard,
  parameters: {
    background: { noPadding: true },
  },
};

export const ResearcherRequestCard: StoryFC<Omit<RequestCardProps, 'request'>> = (
  args,
) => {
  const formattedDate = dayjs(new Date(2021, 2, 28)).format('DD MMM YYYY');
  const request = {
    id: '39788072537',
    state: 'Awaiting',
    updateDate: formattedDate,
    process: 'Article Processing Charge',
    title: 'Knowledge the Territories Attractiveness Volume',
  };
  const [activeTab, setActiveTab] = useState(args.activeTab);
  const onChangeTab = (item: string) => {
    setActiveTab(item);
    args.onChangeTab(item);
  };

  return (
    <Container>
      <RequestCard
        {...args}
        request={request}
        activeTab={activeTab}
        onChangeTab={onChangeTab}
      />
      <OtherSections>{`Contents related to ${activeTab}...`}</OtherSections>
    </Container>
  );
};

ResearcherRequestCard.args = {
  icon: <FundSVG />,
  tabs: ['General Information', 'Process'],
  activeTab: 'Process',
  notificationCount: 1,
};

ResearcherRequestCard.parameters = {
  zeplinLink:
    'https://app.zeplin.io/project/607d33693ea7778ad9c2fb17/screen/60d2cfff6e40b0112c7fc94a',
};

const Container = styled.div`
  padding: 10px;
  height: 100vh;
  width: inherit;
  background-color: ${({ theme }) => theme.background.secondary};
`;

const OtherSections = styled.div`
  padding: 10px;
  margin-top: 24px;
  text-align: center;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.background.primary};
`;
