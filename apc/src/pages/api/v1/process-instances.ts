import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { processDefinitionKeys } from '$bpm/processDefinitionKeys';
import {
  getCamundaPlatformRESTAPI,
  HistoricProcessInstanceDto,
  HistoricVariableInstanceDto,
  TaskDto,
  VariableValueDto,
} from '$service/generated/wfCamunda';
import { attachVariables } from '$service/processInstances/attachVariables';
import { getProcessInstancesActiveTasks } from '$service/processInstances/getProcessInstancesActiveTasks';
import {
  ProcessInstance,
  processInstanceDto,
} from '$service/processInstances/processInstanceDto';

interface Query {
  fields: string;
  includeVariables: string;
  [key: string]: string | string[];
}

type Response = (HistoricProcessInstanceDto & {
  variables?:
    | {
        [key: string]: VariableValueDto;
      }
    | undefined;
  activeTasks?: TaskDto[] | undefined;
})[];

const {
  queryHistoricProcessInstances,
  queryHistoricVariableInstances,
} = getCamundaPlatformRESTAPI();

const getProcessInstances: ApiHandler<any, Response, Query> = async (req, res, ctx) => {
  const query = req.query;
  const { userToken } = ctx;
  const { preferred_username: userId } = userToken!;
  const startedBy = userId;

  const fields = query.fields ? query.fields.split(',') : [];
  const includeVariables = query.includeVariables
    ? query.includeVariables.split(',')
    : [];

  const historicProcessInstances = await queryHistoricProcessInstances(
    {
      startedBy,
      processDefinitionKeyIn: processDefinitionKeys,
      sorting: [
        {
          sortBy: 'startTime',
          sortOrder: 'desc',
        },
      ],
    },
    {},
    req,
  );

  const processInstances: ProcessInstance[] = [...historicProcessInstances];
  const processInstanceIds = processInstances.map(
    (processInstance) => processInstance.id!,
  );

  if (fields.includes('variables')) {
    let processesVariables: HistoricVariableInstanceDto[];
    if (includeVariables.length === 0) {
      processesVariables = await queryHistoricVariableInstances(
        {
          processInstanceIdIn: processInstanceIds,
        },
        {},
        req,
      );
    } else {
      const variableRequests = includeVariables.map((name) =>
        queryHistoricVariableInstances(
          {
            processInstanceIdIn: processInstanceIds,
            variableName: name,
          },
          {},
          req,
        ),
      );
      const variablesByName = await Promise.all(variableRequests);
      processesVariables = variablesByName.flat();
    }

    attachVariables(processInstances, processesVariables);
  }

  let processIdToTasksMap: Record<string, TaskDto[]> = {};
  if (fields.includes('activeTasks')) {
    processIdToTasksMap = await getProcessInstancesActiveTasks(processInstanceIds, req);
  }
  processInstances.forEach((pi) => {
    pi.activeTasks = processIdToTasksMap[pi.id!] ?? [];
  });

  return processInstances;
};

export default withMiddleware(getProcessInstances)({
  operationId: 'getProcessInstances',
  description: 'Search User Process Instances',
  method: 'GET',
  query: {
    type: 'object',
    properties: {
      fields: {
        type: 'string',
        openApiIn: 'query',
        example: 'variables,activeTasks',
      },
      includeVariables: {
        type: 'string',
        openApiIn: 'query',
        example: 'starter',
      },
    },
  },
  response: {
    type: 'array',
    items: processInstanceDto,
  },
});
