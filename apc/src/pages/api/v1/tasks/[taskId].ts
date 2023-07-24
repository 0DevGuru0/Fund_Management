import _ from 'lodash';

import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { BadRequestError } from '$service/errors';
import { getDownloadFileURL, getFileKeyFromUrl } from '$service/file/getDownloadFileUrl';
import {
  AttachmentDto,
  CommentDto,
  getCamundaPlatformRESTAPI,
  GetTaskLocalVariables200,
  GetTaskVariables200,
  IdentityLinkDto,
  TaskDto,
} from '$service/generated/wfCamunda';
import { getResponseSchema } from '$service/openApi/api/getPathResponseType';
import camundaOpenApiSpec from '$service/wfEngine/camunda-7-15.openapi.json';

const bucket = process.env.FILE_STORAGE_BUCKET;
type UserIdentityLink = Omit<IdentityLinkDto, 'groupId' | 'userId'> & {
  userIds: string[];
};
// typescript definition of query
interface Query {
  taskId: string;
  fields: string;
  [key: string]: string | string[];
}

// typescript definition of result in response
type Result = TaskDto & {
  variables?: GetTaskVariables200;
  localVariables?: GetTaskLocalVariables200;
  identityLinks?: UserIdentityLink[];
  attachments?: AttachmentDto[];
  comments?: CommentDto[];
};

// camunda request helping functions
const {
  getHistoricTaskInstances,
  getHistoricVariableInstances,
  getTaskVariables,
  getTaskLocalVariables,
  getIdentityLinks,
  getAttachments,
  getComments,
  getUsers,
} = getCamundaPlatformRESTAPI();

const taskDetails: ApiHandler<any, Result, Query> = async (req, res, ctx) => {
  const { taskId, fields } = req.query;

  // take out requested fields
  let fieldsArray: string[] = [];
  if (typeof fields === 'string') {
    fieldsArray = fields.split(',');
  }
  if (fieldsArray.length === 0) {
    fieldsArray = [
      'variables',
      'localVariables',
      'identityLinks',
      'attachments',
      'comments',
    ];
  }

  // check task existence and get task
  const tasks = await getHistoricTaskInstances({ taskId }, req);
  const isTaskExist = tasks.length === 1;

  // throw error on non existence tasks
  if (!isTaskExist) {
    throw new BadRequestError('Invalid Task Id');
  }

  // definition of result components
  let variables: GetTaskVariables200 | undefined,
    localVariables: GetTaskLocalVariables200 | undefined,
    identityLinks: IdentityLinkDto[] | undefined,
    attachments: AttachmentDto[] | undefined,
    comments: CommentDto[] | undefined;
  const userIdentityLink: UserIdentityLink[] = [];
  const task = tasks[0];

  const isActiveTask = task.deleteReason === null;
  // if the task is a ongoing one, we can get any details requested.
  // here `getTaskVariables` function can get the job done for getting variables,
  // these variables are actually owned by the process instance which owns this task
  if (isActiveTask) {
    const detailPromises = [
      fieldsArray.includes('variables') ? getTaskVariables(taskId, {}, req) : undefined,
      fieldsArray.includes('localVariables')
        ? getTaskLocalVariables(taskId, {}, req)
        : undefined,
      fieldsArray.includes('identityLinks')
        ? getIdentityLinks(taskId, {}, req)
        : undefined,
      fieldsArray.includes('attachments') ? getAttachments(taskId, req) : undefined,
      fieldsArray.includes('comments') ? getComments(taskId, req) : undefined,
    ] as const;
    [variables, localVariables, identityLinks, attachments, comments] = await Promise.all(
      detailPromises,
    );

    // change identity links structure gathered from camunda
    if (identityLinks) {
      for (const identityLink of identityLinks) {
        let userIds: string[] = [];
        if (identityLink.userId) {
          userIds.push(identityLink.userId);
        } else if (identityLink.groupId) {
          const users = await getUsers(
            {
              memberOfGroup: identityLink.groupId,
            },
            req,
          );
          userIds = users.map((user) => user.id!);
        }
        userIdentityLink.push({
          type: identityLink.type,
          userIds,
        });
      }
    }
  } else {
    // if the task is a done one, we just can get variable instances of
    // the process instance which owns this task.
    // we request `getHistoricVariableInstances` with task.processInstanceId
    const variableInstances = fieldsArray.includes('variables')
      ? await getHistoricVariableInstances(
          { processInstanceId: task.processInstanceId! },
          req,
        )
      : undefined;
    // as variable instances is more detailed than the variables returned by
    // `getTaskVariables`, we change their structure to obey `GetTaskVariables200` type
    if (variableInstances) {
      variables = _.chain(variableInstances)
        .keyBy((variableInstance) => variableInstance.name!)
        .mapValues((variableInstance) => ({
          value: variableInstance.value,
          valueInfo: variableInstance.valueInfo,
          type: variableInstance.type,
        }))
        .value();
    }
  }

  // independent of the task status, finally,
  // we construct result and return it as response
  const result: Result = {
    ...task,
    variables,
    localVariables,
    identityLinks: identityLinks ? userIdentityLink : undefined,
    attachments,
    comments,
  };
  if (result.variables?.articlePdfFile?.value) {
    if (Array.isArray(result.variables?.articlePdfFile?.value)) {
      const fileInfo = result.variables?.articlePdfFile.value[0];
      const fileKey = getFileKeyFromUrl(fileInfo.url);
      const fileDownloadUrl = await getDownloadFileURL(
        fileKey,
        String(fileInfo.name),
        String(fileInfo.type),
        bucket,
      );
      fileInfo.url = fileDownloadUrl;
      fileInfo.data.url = fileDownloadUrl;
    }
  }
  return result;
};

// API options:
// Id
// description
// query schema for AJV validation
// response schema for AJV validation
export default withMiddleware(taskDetails)({
  operationId: 'getTaskById',
  description: 'Get Task',
  method: 'GET',
  query: {
    type: 'object',
    properties: {
      taskId: {
        type: 'string',
        openApiIn: 'path',
        format: 'uuid',
      },
      fields: {
        type: 'string',
        openApiIn: 'query',
      },
    },
    required: ['taskId'],
  },
  response: {
    type: 'object',
    allOf: [
      {
        ...getResponseSchema(camundaOpenApiSpec, '/task/{id}'),
      },
      {
        properties: {
          variables: {
            ...getResponseSchema(camundaOpenApiSpec, '/task/{id}/variables'),
          },
          localVariables: {
            ...getResponseSchema(camundaOpenApiSpec, '/task/{id}/localVariables'),
          },
          identityLinks: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                userIds: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                },
                type: {
                  type: 'string',
                },
              },
            },
            nullable: true,
          },
          attachments: {
            ...getResponseSchema(camundaOpenApiSpec, '/task/{id}/attachment'),
          },
          comments: {
            ...getResponseSchema(camundaOpenApiSpec, '/task/{id}/comment'),
          },
        },
      },
    ],
  },
});
