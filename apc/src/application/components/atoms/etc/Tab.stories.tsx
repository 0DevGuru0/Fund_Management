import React, { useState } from 'react';

import { useRouter } from 'next/router';
import styled from 'styled-components';

import { StoryFC } from '$application/components/StoryFC';

import { Tab, CardTabProps, HeadTabProps } from './Tab';

export default {
  title: 'Atoms / Tab',
  component: Tab,
};

export const CardTab: StoryFC<CardTabProps> = (args) => {
  const [activeTab, setActiveTab] = useState(args.activeTab);

  const onChangeTab = (item: string) => {
    setActiveTab(item);
    args.onToggle(item);
  };

  return (
    <Container>
      <Tab {...args} activeTab={activeTab} onToggle={onChangeTab} />
    </Container>
  );
};

export const CardTabWithBadge = CardTab.bind({});
export const CardTabBig = CardTab.bind({});

export const NavigationTab: StoryFC<HeadTabProps> = (args) => {
  const router = useRouter();
  return (
    <Container>
      <Tab {...args} activeTab={router.pathname} />
    </Container>
  );
};

const activeTab = 'General information';
const tabs = [{ label: 'General information' }, { label: 'Funds' }, { label: 'Other' }];

CardTab.args = {
  tabs,
  activeTab,
  variant: 'Card',
  size: 'Small',
};

CardTabWithBadge.args = {
  tabs: [...tabs, { label: 'With badge', hasBadge: true }],
  activeTab,
  variant: 'Card',
  size: 'Small',
};

CardTabBig.args = {
  tabs,
  activeTab,
  variant: 'Card',
  size: 'Big',
};

NavigationTab.args = {
  tabs: [
    { label: 'General information', href: '/' },
    { label: 'Overview', href: '/overview' },
  ],
  activeTab,
  variant: 'Head',
  size: 'Small',
};

const zeplinLink =
  'https://app.zeplin.io/project/607d33693ea7778ad9c2fb17/screen/60d2cfff6e40b0112c7fc94a';

CardTab.parameters = {
  zeplinLink,
};

CardTabWithBadge.parameters = {
  zeplinLink,
};

CardTabBig.parameters = {
  zeplinLink:
    'https://app.zeplin.io/project/60865602084a7012b372e417/screen/60d2c8dad18dc0130021fa41',
};

NavigationTab.parameters = {
  zeplinLink:
    'https://app.zeplin.io/project/60a1f710d2773f25c226fd39/screen/60a1fa8087bc552669e49ed2',
};

const Container = styled.div`
  width: inherit;
`;
