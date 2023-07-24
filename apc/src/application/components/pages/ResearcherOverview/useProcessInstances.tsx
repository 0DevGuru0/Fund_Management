import { useMemo, useState } from 'react';

import { useUserInfo } from '$application/lib/auth/useUserInfo';
import { GetProcessInstances200Item } from '$application/lib/generated/apcApi.schemas';

import { getProcessInstanceRows } from './getProcessInstanceRows';

export const useProcessInstances = (
  processPolicy: Record<string, string>,
  processInstances: GetProcessInstances200Item[] = [],
) => {
  const userInfo = useUserInfo();

  const [toggledTasks, setToggledTasks] = useState({});

  const onToggleTask = (newState, taskKey) => {
    setToggledTasks((_toggledTasks) => ({ ..._toggledTasks, [taskKey]: newState }));
  };

  // TODO: title, activity, and state should read from real values after updating the API
  const tasks = useMemo(
    () =>
      getProcessInstanceRows(
        toggledTasks,
        onToggleTask,
        processInstances,
        processPolicy,
        userInfo.preferred_username,
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [processInstances, processPolicy, toggledTasks],
  );

  return tasks;
};
