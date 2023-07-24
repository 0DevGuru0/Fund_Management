import { NextApiRequest } from 'next';

import { VariableQueryParameterDto } from '$service/generated/wfCamunda';
import {
  GetTaskGroupby200Item,
  getWorkflowServiceRestAPI,
} from '$service/generated/wfService';

interface QueryDetails {
  variables?: VariableQueryParameterDto[] | undefined;
  processDefinitionId?: string;
  username?: string;
}

export const getActiveTasksReport = async (
  query: QueryDetails,
  req: NextApiRequest,
): Promise<GetTaskGroupby200Item[]> => {
  const { getTaskGroupby } = getWorkflowServiceRestAPI();

  return getTaskGroupby(
    'name',
    {
      assignee: query.username,
      processName: 'APC Fund Request',
    },
    req,
  );
};
