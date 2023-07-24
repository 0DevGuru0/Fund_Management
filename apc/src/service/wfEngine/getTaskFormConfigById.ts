import { flow, keyBy, mapValues } from 'lodash';
import { NextApiRequest } from 'next';

import { BadRequestError, NotFoundError } from '$service/errors';
import { getCamundaPlatformRESTAPI } from '$service/generated/wfCamunda';
import { getProcessesVariables } from '$service/variables/getProcessesVariables';

import { getAccessedProcessVariables } from './getAccessedProcessVariables';
import { getFormConfigByKey } from './getFormConfigByKey';
import { getFormVariables } from './getFormVariables';

const { getHistoricTaskInstances } = getCamundaPlatformRESTAPI();

export const getTaskFormConfigById = async (
  taskId: string,
  req: NextApiRequest,
): Promise<Record<string, any>> => {
  const tasks = await getHistoricTaskInstances({ taskId }, req);

  const isTaskExist = tasks.length === 1;
  if (!isTaskExist) {
    throw new BadRequestError('Invalid Task Id');
  }
  const task = tasks[0];
  const { taskDefinitionKey, processDefinitionKey, processInstanceId } = task;

  const config = await getFormConfigByKey(processDefinitionKey!, taskDefinitionKey!);
  if (!config) {
    throw new NotFoundError(
      `No form config found for the following definition key: ${taskDefinitionKey} in the process ${processDefinitionKey}`,
    );
  }

  const accessedProcessVariableNames = getAccessedProcessVariables(config);
  const variablesByProcessInstanceId = await getProcessesVariables(
    [processInstanceId!],
    accessedProcessVariableNames,
    req,
  );
  const accessedProcessVariablesArray = variablesByProcessInstanceId[processInstanceId!];
  const accessedProcessVariablesKeyValue = flow(
    (vars) => keyBy(vars, 'name'),
    (vars) => mapValues(vars, (variable) => variable.value),
  )(accessedProcessVariablesArray);

  return {
    ...config,
    variables: getFormVariables(),
    processVariables: accessedProcessVariablesKeyValue,
  };
};
