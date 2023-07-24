import { flow, groupBy, keyBy, mapValues } from 'lodash';

import { fileVariableValidator } from '$service/variables/fileVariableValidator';

import { ProcessInstance } from './processInstanceDto';

export const attachVariables = (processInstances: ProcessInstance[], variables): void => {
  // filter out file variables
  // files should be taken out in a fix but we preserve this for safety
  const validProcessesVariables = variables.filter(
    (variable) => !fileVariableValidator(variable),
  );
  const variablesByProcessInstanceId = groupBy(
    validProcessesVariables,
    (variable) => variable.processInstanceId,
  );

  processInstances.forEach((processInstance) => {
    const instanceVariables = variablesByProcessInstanceId[processInstance.id!] ?? [];

    processInstance.variables = flow(
      (vars) => keyBy(vars, 'name'),
      (vars) =>
        mapValues(vars, (variable) => ({
          value: variable.value,
          type: variable.type,
          valueInfo: variable.valueInfo,
          id: variable.id,
        })),
    )(instanceVariables);
  });
};
