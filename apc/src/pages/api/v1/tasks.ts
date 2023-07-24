import { flow, keyBy, mapValues } from 'lodash';

import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { isAdmin } from '$service/auth/isAdmin';
import { UnauthorizedError } from '$service/errors';
import {
  TaskQueryDtoSortingItemSortBy,
  VariableQueryParameterDto,
  VariableValueDto,
} from '$service/generated/wfCamunda';
import { getResponseSchema } from '$service/openApi/api/getPathResponseType';
import { queryActiveTasks } from '$service/tasks/queryActiveTasks';
import { queryTasksHistory } from '$service/tasks/queryTasksHistory';
import { ActiveTask } from '$service/tasks/types/ActiveTask';
import { HistoricTask } from '$service/tasks/types/HistoricTask';
import { QueryDetails } from '$service/tasks/types/QueryDetails';
import { convertQueryStringToArray } from '$service/util/convertQueryStringToArray';
import { escapeLikeQuery } from '$service/util/escapeLikeQuery';
import { getProcessesVariables } from '$service/variables/getProcessesVariables';
import camundaOpenApiSpec from '$service/wfEngine/camunda-7-15.openapi.json';

interface Query {
  search: string;
  processDefinitionId: string;
  processInstanceIds: string;
  pageNumber: string;
  getHistory: string;
  fields: string;
  involvedUser: string;
  includeProcessVariables: string;
  assignee: string;
  start: string;
  end: string;
  sortBy: TaskQueryDtoSortingItemSortBy;
  [key: string]: string | string[];
}

type Task = (ActiveTask | HistoricTask) & {
  processVariables?: { [key: string]: VariableValueDto };
};

interface Response {
  tasks: Task[];
  count: number;
}

const tasks: ApiHandler<any, Response, Query> = async (req, _res, ctx) => {
  const {
    getHistory,
    pageNumber,
    search,
    involvedUser,
    processDefinitionId,
    processInstanceIds,
    fields,
    assignee,
    start,
    end,
    sortBy,
  } = req.query;

  const pageNum = pageNumber ? parseInt(pageNumber, 10) : 0;

  const fieldsArray = convertQueryStringToArray(fields);

  const includeProcessVariables = convertQueryStringToArray(
    req.query.includeProcessVariables,
  );

  let variableFilters: VariableQueryParameterDto[] | undefined;

  // TODO: this search should be process agnostic (ArticleTitle is process specific)
  if (search) {
    const isNameSearch = isNaN(parseInt(search, 10));
    variableFilters = [
      isNameSearch
        ? {
            name: 'articleTitle',
            operator: 'like',
            value: `%${escapeLikeQuery(search)}%`,
          }
        : {
            name: 'fundApplicationId',
            operator: 'eq',
            value: search,
          },
    ];
  }

  const username = ctx.userToken.preferred_username;

  let involvedUsername: string | undefined;

  if (involvedUser) {
    if (isAdmin(ctx.userToken)) {
      involvedUsername = involvedUser;
    } else {
      throw new UnauthorizedError("You don't access to perform this action");
    }
  } else {
    involvedUsername = username;
  }

  const query: QueryDetails = {
    involvedUser: involvedUsername === 'all' ? undefined : involvedUsername,
    variables: variableFilters,
    processDefinitionId,
    processInstanceIds: processInstanceIds
      ? convertQueryStringToArray(processInstanceIds)
      : undefined,
    username,
    pageNumber: pageNum,
    assignee,
    start,
    end,
    sortBy,
  };

  const tasksAndCount =
    getHistory === 'true'
      ? await queryTasksHistory(query, req)
      : await queryActiveTasks(query, req);

  const result: Response = { ...tasksAndCount };
  if (fieldsArray.includes('processVariables')) {
    const processIds = result.tasks.map((task) => task.processInstanceId!);

    const variablesByProcessInstanceId = await getProcessesVariables(
      processIds,
      includeProcessVariables,
      req,
    );

    result.tasks.forEach((task) => {
      const variables = variablesByProcessInstanceId[task.processInstanceId!] ?? [];
      task.processVariables = flow(
        (vars) => keyBy(vars, 'name'),
        (vars) =>
          mapValues(vars, (variable) => ({
            value: variable.value,
            type: variable.type,
            valueInfo: variable.valueInfo,
            id: variable.id,
          })),
      )(variables);
    });
  }

  return result;
};

export default withMiddleware(tasks)({
  operationId: 'getTasks',
  description: 'Search User Tasks',
  method: 'GET',
  query: {
    type: 'object',
    properties: {
      involvedUser: {
        type: 'string',
        openApiIn: 'query',
        examples: [
          {
            value: 'all',
          },
          {
            value: 'Ali',
          },
        ],
      },
      search: {
        type: 'string',
        openApiIn: 'query',
        anyOf: [
          {
            type: 'string',
            description: 'by Article Title',
          },
          {
            type: 'string',
            description: 'by ID',
            format: 'int32',
          },
        ],
      },
      processDefinitionId: {
        openApiIn: 'query',
        type: 'string',
      },
      processInstanceIds: {
        openApiIn: 'query',
        type: 'string',
      },
      pageNumber: {
        openApiIn: 'query',
        type: 'string',
        format: 'int32',
      },
      getHistory: {
        openApiIn: 'query',
        type: 'string',
        enum: ['true', 'false'],
      },
      fields: {
        type: 'string',
        openApiIn: 'query',
        example: 'processVariables',
      },
      includeProcessVariables: {
        type: 'string',
        openApiIn: 'query',
        examples: [
          { value: 'starter,articleTitle' },
          { value: 'articleTitle,startedBy,voucherId' },
        ],
      },
      assignee: {
        openApiIn: 'query',
        type: 'string',
      },
      start: {
        openApiIn: 'query',
        type: 'string',
        description:
          'Restrict to tasks that are due after the given date. By default,the date must have the format yyyy-MM-dd"T"HH:mm:ss.SSSZ',
        example: '2013-01-23T14:42:45.435+0200',
      },
      end: {
        openApiIn: 'query',
        type: 'string',
        description:
          'Restrict to tasks that are due before the given date. By default,the date must have the format yyyy-MM-dd"T"HH:mm:ss.SSSZ',
        example: '2013-01-23T14:42:45.435+0200',
      },
      sortBy: {
        openApiIn: 'query',
        type: 'string',
        enum: [
          'instanceId',
          'caseInstanceId',
          'dueDate',
          'executionId',
          'caseExecutionId',
          'assignee',
          'created',
          'description',
          'id',
          'name',
          'nameCaseInsensitive',
          'priority',
          'processVariable',
          'executionVariable',
          'taskVariable',
          'caseExecutionVariable',
          'caseInstanceVariable',
        ],
      },
    },
  },
  response: {
    type: 'object',
    properties: {
      tasks: {
        type: 'array',
        items: {
          type: 'object',
          oneOf: [
            {
              allOf: [
                {
                  properties: { type: { type: 'string', enum: ['active'] } },
                  type: 'object',
                },
                { $ref: '#/components/schemas/TaskDto' },
                {
                  properties: {
                    processVariables: {
                      ...getResponseSchema(camundaOpenApiSpec, '/task/{id}/variables'),
                    },
                  },
                },
              ],
            },
            {
              allOf: [
                {
                  properties: { type: { type: 'string', enum: ['history'] as any } },
                  type: 'object',
                },
                { $ref: '#/components/schemas/HistoricTaskInstanceDto' },
                {
                  properties: {
                    processVariables: {
                      ...getResponseSchema(camundaOpenApiSpec, '/task/{id}/variables'),
                    },
                  },
                },
              ],
            },
          ],
        },
      },
      count: {
        type: 'integer',
      },
    },
  },
});
