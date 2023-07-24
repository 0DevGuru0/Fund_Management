import React, { FC, useContext, useState, useEffect } from 'react';

import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai/utils';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';

import { LoadingData } from '$application/components/atoms/etc/LoadingData';
import { SubmitTaskModal } from '$application/components/organisms/forms/SubmitTaskModal';
import { Table as SingleTable } from '$application/components/organisms/tables/Table';
import { Filter } from '$application/components/organisms/tables/Table/Filter';
import Pagination from '$application/components/organisms/tables/Table/Pagination';
import SelectedRowCard from '$application/components/organisms/tables/Table/SelectedRowCard';
import Chart from '$application/components/templates/Tasks/Chart';
import { tasksConfig } from '$service/tasks/config';

import {
  FilterContext,
  IFilterContext,
  initFilterContext,
} from '../organisms/tables/Table/Filter/FilterContext';

import EmptyTable from './Tasks/EmptyTable';
import { inboxFiltersConfig } from './Tasks/filters.config';
import { tableDefinitions } from './Tasks/tableUtils';
import { TasksContext } from './Tasks/TasksContext';
import { useTasks } from './Tasks/useTasks';

export interface ICheckAndDo {
  name: string;
  description: string;
  id: string;
}

export interface TasksProps {
  isAdmin?: boolean;
  username?: string;
}

export const Tasks: FC<TasksProps> = ({ isAdmin = false, username }) => {
  const {
    currentPageAtom,
    filterOptionsAtom,
    filterCardOpenAtom,
    selectedTasksAtom,
    sortByTaskAtom,
    space,
  } = useContext(TasksContext);

  const [selectedTasks, setSelectedTasks] = useAtom(selectedTasksAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [taskToSubmit, setTaskToSubmit] = useState<ICheckAndDo | null>(null);

  const { selectAllCheckedAtom } = useContext(FilterContext);
  const selectedAll = useAtomValue(selectAllCheckedAtom);

  const { tasks, count, isLoading, error, tasksData } = useTasks(
    currentPage,
    setTaskToSubmit,
    isAdmin,
    username,
  );

  const config = inboxFiltersConfig(tasks);
  const router = useRouter();
  const onRowClicked = (rowId: number) => {
    const taskId = tasks[rowId].id;
    const task = tasksData?.find(({ id }) => id === taskId);
    if (task?.processInstanceId) {
      router.push(`/${space}/process/${task.processInstanceId}`);
    }
  };

  useEffect(() => {
    if (selectedAll && tasks) {
      const newState = {};
      tasks.forEach((task) => {
        newState[task.id] = true;
      });
      setSelectedTasks(newState);
    } else {
      setSelectedTasks({});
    }
  }, [selectedAll]);

  const hasData = !isLoading && !isEmpty(tasks);
  const hasMoreTasksThanOnePage = (count ?? 0) > tasksConfig.inboxPageSize;

  let selectedTasksCount = 0;
  Object.keys(selectedTasks).forEach((key) =>
    selectedTasks[key] ? selectedTasksCount++ : '',
  );

  const sortItems = ['Task', 'Assignee', 'Due Date'];
  const initContext: IFilterContext = {
    ...initFilterContext,
    config,
    filterCardOpenAtom,
    showSelectAll: false, // set true to enable select all
    variant: 'SearchAndSortAndToggle',
    filtersAtom: filterOptionsAtom,
    searchPlaceholder: 'Search by Title or Key ID',
    sortOptions: sortItems,
    sortByAtom: sortByTaskAtom,
  };

  return (
    <Wrapper>
      {hasData && <Chart />}
      {taskToSubmit && (
        <SubmitTaskModal
          title={taskToSubmit.name}
          subTitle={taskToSubmit.description}
          taskId={taskToSubmit.id}
          onCancel={() => setTaskToSubmit(null)}
        />
      )}
      <TableWrapper>
        <FilterContext.Provider value={initContext}>
          <Filter />
        </FilterContext.Provider>
        <LoadingData
          loading={isLoading}
          error={error && { message: error }}
          customLoaderWrapper={(Loader) => (
            <LoaderWrapper>
              <Loader />
            </LoaderWrapper>
          )}
        >
          {() =>
            isEmpty(tasks) ? (
              <EmptyTable />
            ) : (
              <SingleTable
                onRowClick={onRowClicked}
                isLastFixed
                definitions={tableDefinitions}
                items={tasks}
                isAdmin
              />
            )
          }
        </LoadingData>
      </TableWrapper>
      {hasData && hasMoreTasksThanOnePage && (
        <Pagination
          customStyle={PaginationWrapperStyle}
          totalCount={count ?? 0}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          pageSize={tasksConfig.inboxPageSize}
        />
      )}

      {selectedTasksCount > 0 && (
        <SelectedRowCard totalRowsSelected={selectedTasksCount} showGroupButton={false} />
      )}
    </Wrapper>
  );
};

const TableWrapper = styled.div`
  margin-top: 48px;
`;

const PaginationWrapperStyle = css`
  margin-top: 24px;
  float: right;
`;
const LoaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Wrapper = styled.div`
  padding: 36px;
  padding-bottom: 0px;
`;

export default Tasks;
