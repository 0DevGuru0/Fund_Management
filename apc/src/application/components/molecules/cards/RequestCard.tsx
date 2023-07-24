import React, { FC, ReactNode } from 'react';

import styled from 'styled-components';

import { Tab, CardTabItem } from '$application/components/atoms/etc/Tab';
import { taskToColor } from '$application/lib/taskToColor';

export interface RequestInfo {
  id: string;
  title: string;
  state: string;
  process: string;
  updateDate: string;
}

export interface RequestCardProps {
  tabs: string[];
  icon: ReactNode;
  activeTab: string;
  request: RequestInfo;
  notificationCount?: number;
  isManagement?: boolean;
  onChangeTab: (tab: string) => void;
}

export const RequestCard: FC<RequestCardProps> = ({
  icon,
  tabs,
  request,
  activeTab,
  notificationCount = 0,
  isManagement = false,
  onChangeTab,
}) => {
  const cardTabs = (stringTabs: string[]): CardTabItem[] => {
    return stringTabs.map((tab) => {
      return tab === 'Process'
        ? {
            label: tab,
            hasBadge: notificationCount !== 0,
            badgeNumber: notificationCount,
          }
        : { label: tab };
    });
  };

  return (
    <Container isManagement={isManagement} className="border shadow">
      <DataContainer isManagement={isManagement}>
        <IconContainer isManagement={isManagement}>{icon}</IconContainer>
        <IdentityContainer>
          <Process>{request.process}</Process>
          <TitleContainer>
            <Title>{request.title}</Title>
            <State background={taskToColor[request.state]}>{request.state}</State>
          </TitleContainer>
          <RequestId>{request.id}</RequestId>
        </IdentityContainer>
        <UpdateDate>last update: {request.updateDate}</UpdateDate>
      </DataContainer>
      <TabContainer>
        <Tab
          tabs={cardTabs(tabs)}
          variant="Card"
          size="Small"
          activeTab={activeTab}
          onToggle={onChangeTab}
        />
      </TabContainer>
    </Container>
  );
};

interface ContainerProps {
  isManagement: boolean;
}

const containerBorderColor = (theme) => `solid 1px ${theme.palette.grey['400']}`;
const Container = styled.div<ContainerProps>`
  width: inherit;
  padding: 36px 36px 0;
  background-color: ${({ theme }) => theme.background.primary};
  border-bottom: ${({ isManagement, theme }) =>
    isManagement && containerBorderColor(theme)};
`;

interface IconContainerProps {
  isManagement: boolean;
}

const IconContainer = styled.div<IconContainerProps>`
  padding: 23px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.background.secondary};
  width: ${({ isManagement }) => (isManagement ? '60px' : '48px')};
  height: ${({ isManagement }) => (isManagement ? '60px' : '48px')};
  & > svg {
    width: 48px;
    height: 48px;
    path,
    use {
      fill: ${({ theme }) => theme.palette.primary};
    }
  }
`;

const Process = styled.div`
  margin: 6px 0;
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.text.contrast.primary};
`;

const TitleContainer = styled.div`
  display: inline-flex;
  margin-bottom: 12px;
`;

const Title = styled.div`
  font-size: 20px;
  line-height: 24px;
  font-weight: bold;
  margin-right: 12px;
  color: ${({ theme }) => theme.text.contrast.secondary};
`;

interface StateProps {
  background: string;
}

const State = styled.div<StateProps>`
  padding: 3px 12px;
  font-weight: bold;
  line-height: 18px;
  width: max-content;
  border-radius: 4px;
  color: ${({ theme }) => theme.background.primary};
  background-color: ${({ background }) => background};
`;

const RequestId = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.palette.grey['800']};
`;

const UpdateDate = styled.div`
  margin: 12px 0;
  font-size: 14px;
  text-align: right;
  color: ${({ theme }) => theme.text.contrast.primary};
`;

interface DataContainerProps {
  isManagement: boolean;
}

const DataContainer = styled.div<DataContainerProps>`
  display: grid;
  grid-column-gap: ${({ isManagement }) => (isManagement ? '35px' : '24px')};
  grid-template-columns: 94px 1fr minmax(100px, 180px);
`;

const IdentityContainer = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const TabContainer = styled.div`
  margin-top: 24px;
  padding-top: 16px;
`;
