import { NextApiRequest } from 'next';

import {
  getCamundaPlatformRESTAPI,
  HistoricTaskInstanceQueryDto,
} from '$service/generated/wfCamunda';

import { tasksConfig } from './config';
import { QueryDetails } from './types/QueryDetails';
import { TaskResult } from './types/TaskResult';

const {
  queryHistoricTaskInstances,
  queryHistoricTaskInstancesCount,
} = getCamundaPlatformRESTAPI();

export const queryTasksHistory = async (
  query: QueryDetails,
  req: NextApiRequest,
): Promise<TaskResult> => {
  const {
    username,
    variables,
    processDefinitionId,
    processInstanceIds,
    pageNumber,
    involvedUser,
  } = query;
  const pageSize = tasksConfig.inboxPageSize;

  const filter: HistoricTaskInstanceQueryDto = {
    variableValuesIgnoreCase: true,
    taskInvolvedUser: involvedUser,
    taskVariables: variables,
    processDefinitionId,
    sorting: [
      {
        sortBy: 'startTime',
        sortOrder: 'desc',
      },
      {
        sortBy: 'endTime',
        sortOrder: 'desc',
      },
    ],
    orQueries: [
      ...(processInstanceIds ?? []).map((processInstanceId) => ({
        processInstanceId,
      })),
      {
        taskInvolvedUser: processInstanceIds ? undefined : username,
        // TODO: make this work for history!
        // taskHadCandidateUser: username,
      },
    ],
  };

  const [camundaTasks, count] = await Promise.all([
    queryHistoricTaskInstances(
      filter,
      {
        firstResult: pageNumber * pageSize,
        maxResults: pageSize,
      },
      req,
    ),
    queryHistoricTaskInstancesCount(filter, req),
  ]);

  const tasks = camundaTasks.map((task) => ({ type: 'history', ...task } as const));

  return { tasks, count: count.count! };
};
