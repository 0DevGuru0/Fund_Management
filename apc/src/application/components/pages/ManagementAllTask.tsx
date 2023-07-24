import React, { useContext, useEffect } from 'react';

import { useAtomValue, useResetAtom } from 'jotai/utils';
import { NextPage } from 'next';

import { accessTokenAtom } from '$application/lib/auth/store';
import { useUserInfo } from '$application/lib/auth/useUserInfo';
import { useGetTasks, useGetTasksSummary } from '$application/lib/generated/apcApi';
import { Role } from '$service/groups/Role';

import Tasks from '../templates/Tasks';
import { ITasksContext, TasksContext } from '../templates/Tasks/TasksContext';

import { getSortBy } from './ManagementAllTask/mapSort';
import {
  currentPageAtom,
  filterOptionsAtom,
  selectedTasksAtom,
  filterCardOpenAtom,
} from './ManagementAllTask/store';

const ManagementAllTask: NextPage = () => {
  const { sortByTaskAtom } = useContext(TasksContext);
  const accessToken = useAtomValue(accessTokenAtom);
  const currentPage = useAtomValue(currentPageAtom);
  const sortByAtomValue = useAtomValue(sortByTaskAtom);
  const filterOptionValue = useAtomValue(filterOptionsAtom);
  const resetFilterOptionValue = useResetAtom(filterOptionsAtom);
  const resetCurrentPage = useResetAtom(currentPageAtom);
  const userInfo = useUserInfo();

  const { isLoading: summariesLoading, data: summaries } = useGetTasksSummary(
    { involvedUser: 'all' },
    {
      query: { enabled: !!accessToken },
    },
  );

  const { data, error, isFetching } = useGetTasks(
    {
      pageNumber: String(currentPage - 1),
      fields: 'processVariables',
      involvedUser: 'all',
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
    space: 'management',
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

export default ManagementAllTask;
