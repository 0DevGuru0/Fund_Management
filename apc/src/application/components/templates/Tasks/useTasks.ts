import { useContext, useMemo } from 'react';

import { useAtomValue } from 'jotai/utils';
import { pick } from 'lodash';
import { useRouter } from 'next/router';

import { GetTasks200TasksItem } from '$application/lib/generated/apcApi.schemas';

import { getMappedTasks } from './tableUtils';
import { TasksContext } from './TasksContext';

interface ITasks {
  tasks: any[];
  tasksData?: GetTasks200TasksItem[];
  count?: number;
  isLoading: boolean;
  error: unknown;
}
export const useTasks = (
  currentPage: number,
  onCheckAndDo,
  isAdmin?: boolean,
  username?: string,
): ITasks => {
  const {
    tasks: { data, error, isFetching },
    selectedTasksAtom,
  } = useContext(TasksContext);

  // const [selectedTasks, setSelectedTasks] = useAtom(selectedTasksAtom);
  const selectedTasks = useAtomValue(selectedTasksAtom);
  const router = useRouter();

  const { tasks: tasksData, count } = data ?? { tasks: [], count: 0 };

  const onToggleTask = (newState, taskKey): void => {
    // setSelectedTasks((_toggledTasks) => ({ ..._toggledTasks, [taskKey]: newState }));
  };

  const onCheckAndDoHandler = (taskId: string): void => {
    const task = tasksData?.find((_task) => _task.id === taskId);
    onCheckAndDo(pick(task, ['id', 'name', 'description']));
  };

  const onViewDetails = (processInstanceId: string): void => {
    router.push(`process/${processInstanceId}`);
  };

  // title process  description state
  const tasks = useMemo(
    () =>
      getMappedTasks({
        currentPage,
        selectedTasks,
        onToggleTask,
        onCheckAndDo: onCheckAndDoHandler,
        onViewDetails,
        tasksData,
        isAdmin,
        username,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tasksData, currentPage, selectedTasks],
  );

  return {
    tasks,
    tasksData,
    count,
    isLoading: isFetching,
    error,
  };
};
