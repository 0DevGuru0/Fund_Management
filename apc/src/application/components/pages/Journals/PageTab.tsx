import React, { FC } from 'react';

import styled from 'styled-components';

import { Tab } from '$application/components/atoms/etc/Tab';

import { JournalsTabs } from './store';

interface JournalsPageTab {
  activeTab: string;
  onToggle: (tab: JournalsTabs.List) => void;
}

const PageTab: FC<JournalsPageTab> = ({ activeTab, onToggle }) => {
  return (
    <TabContainer>
      <Tab
        size="Big"
        variant="Card"
        onToggle={(value: any) => onToggle(value)}
        activeTab={activeTab}
        tabs={[{ label: 'List' }, { label: 'Groups' }]}
      />
    </TabContainer>
  );
};

export default PageTab;

const TabContainer = styled.div`
  padding: 16px 36px 0 36px;
  border-bottom: solid 1px ${({ theme }) => theme.border};
`;
