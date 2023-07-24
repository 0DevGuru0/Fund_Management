import { groupBy } from 'lodash';

import {
  getCamundaPlatformRESTAPI,
  HistoricVariableInstanceDto,
} from '$service/generated/wfCamunda';
import { MutatorOptions } from '$service/wfEngine/orvalGotMutator';

import { fileVariableValidator } from './fileVariableValidator';

const { queryHistoricVariableInstances } = getCamundaPlatformRESTAPI();

interface Result {
  [key: string]: HistoricVariableInstanceDto[];
}

export const getProcessesVariables = async (
  processInstanceIds: string[],
  variableNamesArray: string[],
  req: MutatorOptions,
): Promise<Result> => {
  let processesVariables: HistoricVariableInstanceDto[];
  if (variableNamesArray.length === 0) {
    processesVariables = await queryHistoricVariableInstances(
      {
        processInstanceIdIn: processInstanceIds,
      },
      {},
      req,
    );
  } else {
    const parallelRequests = variableNamesArray.map((name) =>
      queryHistoricVariableInstances(
        {
          processInstanceIdIn: processInstanceIds,
          variableName: name,
        },
        {},
        req,
      ),
    );
    const variablesByName = await Promise.all(parallelRequests);
    processesVariables = variablesByName.flat();
  }

  // filter out file variables
  // files should be taken out in a fix but we preserve this for safety
  const validProcessesVariables = processesVariables.filter(
    (variable) => !fileVariableValidator(variable),
  );
  const variablesByProcessInstanceId = groupBy(
    validProcessesVariables,
    (variable) => variable.processInstanceId,
  );
  return variablesByProcessInstanceId;
};
