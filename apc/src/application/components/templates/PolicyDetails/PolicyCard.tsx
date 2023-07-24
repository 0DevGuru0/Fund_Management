import React, { FC, ReactNode } from 'react';

import { capitalize } from 'lodash';
import Link from 'next/link';
import styled from 'styled-components';

import ArrowSVG from '$application/assets/icons/arrow-left.svg';
import MeetingFillSVG from '$application/assets/icons/meeting-fill.svg';
import IconButton from '$application/components/atoms/buttons/IconButton';
import { Tab, CardTabItem } from '$application/components/atoms/etc/Tab';
import { GetPolicies200PoliciesItemAllOfSixJournalGroupsItem } from '$application/lib/generated/apcApi.schemas';
import { taskToColor } from '$application/lib/taskToColor';
import { getUserRole } from '$application/utils/userRole';

import { TabsType } from '../PolicyDetails';

export interface PolicyInfo {
  id: string;
  title: string;
  state: string;
  type: string;
  journalGroups?: GetPolicies200PoliciesItemAllOfSixJournalGroupsItem[] | null;
}

export interface PolicyCardProps {
  tabs: string[];
  icon: ReactNode;
  actions?: ReactNode;
  activeTab: string;
  policy: PolicyInfo;
  hasNotification: boolean;
  onChangeTab: (tab: TabsType) => void;
}

export const PolicyCard: FC<PolicyCardProps> = ({
  icon,
  tabs,
  policy,
  activeTab,
  hasNotification,
  onChangeTab,
  actions,
}) => {
  const cardTabs = (stringTabs: string[]): CardTabItem[] =>
    stringTabs.map((tab) =>
      tab === 'Process' ? { label: tab, hasBadge: hasNotification } : { label: tab },
    );

  const { role } = getUserRole();
  let href = '/fundManager/policies';

  if (role === 'SystemAdmin') {
    href = '/management/policies';
  }
  return (
    <>
      <BackContainer>
        <Link href={href}>
          <IconButton
            color="Primary"
            variant="WithText"
            icon={<ArrowSVG />}
            title="Back to Policies"
          />
        </Link>
      </BackContainer>

      <Container className="border shadow">
        <DataContainer>
          <TitleWrapper>
            <IconContainer>{icon}</IconContainer>
            <TitleContainer>
              <Title>
                <span>{policy.title}</span>
                <State background={taskToColor[policy.state]}>{policy.state}</State>
              </Title>
              <Groups>
                <MeetingFillSVG />
                {policy.journalGroups
                  ?.map((jg) => (jg as any).journalGroup.title)
                  .join(', ')}
              </Groups>
              <Type>{capitalize(policy.type)}</Type>
            </TitleContainer>
          </TitleWrapper>
          {actions}
        </DataContainer>
        <TabContainer>
          <Tab
            tabs={cardTabs(tabs)}
            variant="Card"
            size="Small"
            activeTab={activeTab}
            onToggle={(item) => onChangeTab(item as TabsType)}
          />
        </TabContainer>
      </Container>
    </>
  );
};

export default PolicyCard;

const Container = styled.div`
  width: inherit;
  padding: 36px 36px 0;
  background-color: ${({ theme }) => theme.background.primary};
`;

const IconContainer = styled.div`
  padding: 23px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.background.secondary};
  display: flex;
  align-self: center;
  justify-content: center;
  & > svg {
    width: 48px;
    height: 48px;
    path,
    use {
      fill: ${({ theme }) => theme.palette.primary};
    }
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 20px;
  line-height: 24px;
  font-weight: bold;
  margin-right: 12px;
  color: ${({ theme }) => theme.text.contrast.secondary};
`;

interface StateProps {
  background: string;
}

const State = styled.span<StateProps>`
  display: inline-block;
  padding: 3px 12px;
  font-weight: bold;
  line-height: 18px;
  width: max-content;
  border-radius: 4px;
  font-size: 14px;
  color: ${({ theme }) => theme.background.primary};
  background-color: ${({ background }) => background};
`;

const Type = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text.contrast.primary};
`;

const Groups = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;
  color: ${({ theme }) => theme.link.text};

  & > svg {
    path,
    use > {
      fill: ${({ theme }) => theme.link.text};
    }
    height: 20px;
    width: 20px;
  }
`;

const DataContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TabContainer = styled.div`
  margin-top: 24px;
  padding-top: 16px;
  border-bottom: solid 1px ${({ theme }) => theme.border};
`;

const BackContainer = styled.div`
  margin: 24px 36px 0;
`;
