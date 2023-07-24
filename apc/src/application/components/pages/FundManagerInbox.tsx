import React, { useContext, useEffect } from 'react';

import { useAtomValue, useResetAtom } from 'jotai/utils';
import { NextPage } from 'next';

import {
  currentPageAtom,
  filterOptionsAtom,
  selectedTasksAtom,
  filterCardOpenAtom,
} from '$application/components/pages/ManagementInbox/store';
import Tasks from '$application/components/templates/Tasks';
import {
  ITasksContext,
  TasksContext,
} from '$application/components/templates/Tasks/TasksContext';
import { accessTokenAtom } from '$application/lib/auth/store';
import { useUserInfo } from '$application/lib/auth/useUserInfo';
import { useGetTasks, useGetTasksSummary } from '$application/lib/generated/apcApi';
import { getUserRole } from '$application/utils/userRole';
import { Role } from '$service/groups/Role';

import { getSortBy } from './ManagementAllTask/mapSort';

const FundManagerInbox: NextPage = () => {
  const { sortByTaskAtom } = useContext(TasksContext);

  const currentPage = useAtomValue(currentPageAtom);
  const accessToken = useAtomValue(accessTokenAtom);
  const sortByAtomValue = useAtomValue(sortByTaskAtom);
  const filterOptionValue = useAtomValue(filterOptionsAtom);
  const resetCurrentPage = useResetAtom(currentPageAtom);
  const resetFilterOptionValue = useResetAtom(filterOptionsAtom);

  const userInfo = useUserInfo();
  const { role } = getUserRole();
  const space = role === 'FundManager' ? 'fundManager' : 'fundFinancialManager';

  // TODO: These API should change when Authorization enabled.
  const { isLoading: summariesLoading, data: summaries } = useGetTasksSummary(
    {},
    {
      query: { enabled: !!accessToken },
    },
  );

  const { data, error, isFetching } = useGetTasks(
    {
      pageNumber: String(currentPage - 1),
      fields: 'processVariables',
      includeProcessVariables: 'articleTitle,startedBy,fundApplicationId,description',
      sortBy: getSortBy(sortByAtomValue),
      search: filterOptionValue.searchPhrase
        ? String(filterOptionValue.searchPhrase)
        : '',
    },
    {
      query: {
        keepPreviousData: true,
      },
    },
  );

  useEffect(() => {
    resetCurrentPage();
  }, [filterOptionValue]);

  useEffect(() => {
    resetFilterOptionValue();
  }, []);

  const initTasks: ITasksContext = {
    space,
    tasks: { data: data ?? { count: 0, tasks: [] }, error, isFetching },
    tasksSummary: {
      isLoading: summariesLoading,
      summaries: summaries ?? [],
    },
    currentPageAtom,
    filterOptionsAtom,
    selectedTasksAtom,
    filterCardOpenAtom,
    sortByTaskAtom,
  };

  return (
    <TasksContext.Provider value={initTasks}>
      <Tasks
        isAdmin={!!userInfo.roles[Role.SystemAdmin]}
        username={userInfo.preferred_username}
      />
    </TasksContext.Provider>
  );
};

export default FundManagerInbox;
