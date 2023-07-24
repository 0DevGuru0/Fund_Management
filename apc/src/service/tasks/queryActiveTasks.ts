import { NextApiRequest } from 'next';

import { processDefinitionKeys } from '$bpm/processDefinitionKeys';
import { getCamundaPlatformRESTAPI, TaskQueryDto } from '$service/generated/wfCamunda';

import { tasksConfig } from './config';
import { QueryDetails } from './types/QueryDetails';
import { TaskResult } from './types/TaskResult';

const { queryTasks, queryTasksCount } = getCamundaPlatformRESTAPI();

export const queryActiveTasks = async (
  query: QueryDetails,
  req: NextApiRequest,
): Promise<TaskResult> => {
  const {
    // username,
    variables,
    processDefinitionId,
    processInstanceIds,
    involvedUser,
    pageNumber,
    assignee,
    start,
    end,
    sortBy,
  } = query;
  const pageSize = tasksConfig.inboxPageSize;

  const filter: TaskQueryDto = {
    involvedUser,
    processVariables: variables,
    variableValuesIgnoreCase: true,
    processDefinitionId,
    // TODO: we may need to uncomment this if we have unrelated process defs in a tenant
    processDefinitionKeyIn: processDefinitionKeys,
    processInstanceIdIn: processInstanceIds,
    assignee,
    dueAfter: start,
    dueBefore: end,
    sorting: [
      {
        sortBy: sortBy ?? 'created',
        sortOrder: 'asc',
      },
    ],
    orQueries: [
      {
        // TODO: fix this!
        // involvedUser: username,
        // candidateUser: username,
      },
    ],
  };

  const [camundaTasks, count] = await Promise.all([
    queryTasks(
      filter,
      {
        firstResult: pageNumber * pageSize,
        maxResults: pageSize,
      },
      req,
    ),
    queryTasksCount(filter, req),
  ]);

  const tasks = camundaTasks.map((task) => ({ type: 'active', ...task } as const));

  return { tasks, count: count.count! };
};
