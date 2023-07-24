import React, { useState } from 'react';

import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import dayjs from 'dayjs';
import _, { isEmpty } from 'lodash';
import { NextPage } from 'next';
import styled from 'styled-components';

import ProcessFlowBanner from '$application/assets/process-flow.svg';
import { Calendar } from '$application/components/atoms/calendar/Calendar';
import { LoadingData } from '$application/components/atoms/etc/LoadingData';
import { Table } from '$application/components/organisms/tables/Table';
import ApplyForFund from '$application/components/pages/ResearcherOverview/ApplyForFund';
import EmptyPage from '$application/components/pages/ResearcherOverview/EmptyPage';
import { useUserInfo } from '$application/lib/auth/useUserInfo';
import {
  useGetFundApplications,
  useGetProcessInstances,
  useGetTasks,
} from '$application/lib/generated/apcApi';
import { hideScrollBar } from '$application/utils';

import APCFundRequestVariables from './ProcessInstanceDetails/APCFundRequestVariables';
import { ResearcherOverviewGauge } from './ResearcherOverview/Gauge';
import { overviewTableDefinition } from './ResearcherOverview/tableDefinition';
import { useProcessInstances } from './ResearcherOverview/useProcessInstances';

const includeVariables = [
  'articleTitle',
  'publisher',
  'journal',
  'publishPrice',
  'fundApplicationId',
  'description',
  'currency',
] as const;

type IncludedVariables = typeof includeVariables[number];
export type ProcessInstanceListVariables = Pick<
  APCFundRequestVariables,
  IncludedVariables
>;

export const getProcessInstancesParams = {
  fields: 'variables,activeTasks',
  includeVariables: includeVariables.join(','),
};

export const ResearcherOverview: NextPage = () => {
  const userInfo = useUserInfo();

  const [filteredDay, setFilteredDay] = useState<Date | null>(null);
  const onDateChange = (date: MaterialUiPickersDate) => {
    if (filteredDay && date?.isSame(filteredDay)) {
      setFilteredDay(null);
    } else {
      setFilteredDay(date?.toDate() || null);
    }
  };

  const {
    isLoading: loadingInstances,
    data: processInstances,
    error,
  } = useGetProcessInstances(getProcessInstancesParams);

  const processInstanceIds = _.join(
    processInstances?.map((processInstance) => processInstance.id),
    ',',
  );
  const { data: fundApplicationData } = useGetFundApplications({
    processInstanceIds,
    fields: 'policy',
  });
  const processPolicies: Record<string, string> = {};
  fundApplicationData?.fundApplications?.forEach((fundApplication) => {
    processPolicies[fundApplication.processInstanceId!] = fundApplication.policy!.title;
  });

  const { data: tasksDetails } = useGetTasks({
    processInstanceIds,
    assignee: userInfo.preferred_username,
  });
  const deadlines: string[] = [];
  tasksDetails?.tasks?.forEach((task) => {
    if (task.due) {
      deadlines.push(task.due);
    }
  });
  let filteredTaskProcessIds: string[] | undefined;
  if (filteredDay) {
    filteredTaskProcessIds = tasksDetails?.tasks
      ?.filter((task) => task.due && dayjs(filteredDay).isSame(task.due, 'date'))
      .map((task) => task.processInstanceId!);
  }

  const requestRows = useProcessInstances(
    processPolicies,
    filteredTaskProcessIds
      ? processInstances?.filter((processInstance) =>
          filteredTaskProcessIds?.includes(processInstance.id!),
        )
      : processInstances,
  );

  return (
    <LoadingData loading={loadingInstances} error={error && { message: error }}>
      {() => (
        <Body>
          {isEmpty(processInstances) ? (
            <EmptyPage />
          ) : (
            <>
              <Container>
                <InnerGrid>
                  <ApplyForFund />
                  <Banner>
                    <ProcessFlowBanner />
                  </Banner>
                  <ResearcherOverviewGauge
                    processInstances={processInstances}
                    username={userInfo.preferred_username}
                  />
                </InnerGrid>
                <ExtendedCalendar
                  onChange={onDateChange}
                  filteredDay={filteredDay}
                  deadlines={deadlines}
                />
              </Container>
              {requestRows && (
                <>
                  <SectionHeader>My Applications</SectionHeader>
                  <Table
                    items={requestRows}
                    definitions={overviewTableDefinition}
                    rounded
                  />
                </>
              )}
            </>
          )}
        </Body>
      )}
    </LoadingData>
  );
};

export default ResearcherOverview;

const Body = styled.div`
  box-sizing: border-box;
  width: 1548px;
  height: inherit;
  padding: 24px 36px;
  overflow-y: scroll;
  margin: 0 auto;
  ${hideScrollBar}
`;

const SectionHeader = styled.div`
  font-size: 24px;
  line-height: 32px;
  font-weight: bold;
  margin-top: 12px;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.text.contrast.secondary};
`;

const Container = styled.div`
  display: flex;
`;

const Banner = styled.div`
  width: 100%;
  height: 200px;
  margin-bottom: 24px;
  svg use {
    fill: ${({ theme }) => theme.palette.grey[600]};
  }
`;

const InnerGrid = styled.div`
  flex-grow: 1;
  display: flex;
  margin-right: 24px;
  flex-direction: column;
`;

const ExtendedCalendar = styled(Calendar)`
  && {
    width: 369px;
    padding: 36px;
    margin-top: -5px;
    transform: scaleY(0.96);
    min-height: 503px;
    border: none;
    box-shadow: 0 2px 6px 0 #eff3fa;
  }
`;
