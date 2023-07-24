import { groupBy } from 'lodash';
import { NextApiRequest } from 'next';

import { TaskDto } from '$application/lib/generated/apcApi.schemas';
import { getCamundaPlatformRESTAPI } from '$service/generated/wfCamunda';

const { queryTasks } = getCamundaPlatformRESTAPI();

export const getProcessInstancesActiveTasks = async (
  processInstanceIds: string[],
  req: NextApiRequest,
): Promise<Record<string, TaskDto[]>> => {
  const tasks = await queryTasks(
    {
      processInstanceIdIn: processInstanceIds,
    },
    {},
    req,
  );

  return groupBy(tasks, 'processInstanceId');
};
