import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { getDownloadFileURL, getFileKeyFromUrl } from '$service/file/getDownloadFileUrl';
import {
  getCamundaPlatformRESTAPI,
  HistoricVariableInstanceDto,
  ProcessInstanceDto,
} from '$service/generated/wfCamunda';
import { getResponseSchema } from '$service/openApi/api/getPathResponseType';
import camundaOpenApiSpec from '$service/wfEngine/camunda-7-15.openapi.json';

interface Query {
  processInstanceId: string;
  fields: string;
  [key: string]: string | string[];
}

type Result = ProcessInstanceDto & {
  variables?: HistoricVariableInstanceDto[];
};

const {
  getHistoricProcessInstance,
  getHistoricVariableInstances,
} = getCamundaPlatformRESTAPI();

const bucket = process.env.FILE_STORAGE_BUCKET;
const processInstanceDetails: ApiHandler<any, Result, Query> = async (req, res, ctx) => {
  const { processInstanceId, fields } = req.query;
  let fieldsArray: string[] = [];
  if (typeof fields === 'string') {
    fieldsArray = fields.split(',');
  }
  if (fieldsArray.length === 0) {
    fieldsArray = ['variables'];
  }

  const resultPromises = [
    getHistoricProcessInstance(processInstanceId, req),
    fieldsArray.includes('variables')
      ? getHistoricVariableInstances({ processInstanceId }, req)
      : undefined,
  ] as const;

  const [task, variables] = await Promise.all(resultPromises);
  if (variables) {
    variables.forEach(async (variableItem) => {
      if (variableItem.name === 'articlePdfFile') {
        if (Array.isArray(variableItem.value)) {
          const fileInfo = variableItem.value[0];
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
    });
  }

  const result: Result = {
    ...task,
    variables,
  };

  return result;
};

export default withMiddleware(processInstanceDetails)({
  operationId: 'getProcessInstanceById',
  description: 'Get process instance details',
  method: 'GET',
  query: {
    type: 'object',
    properties: {
      processInstanceId: {
        type: 'string',
        openApiIn: 'path',
        format: 'uuid',
      },
      fields: {
        type: 'string',
        openApiIn: 'query',
      },
    },
    required: ['processInstanceId'],
  },
  response: {
    type: 'object',
    allOf: [
      {
        ...getResponseSchema(camundaOpenApiSpec, '/history/process-instance/{id}'),
      },
      {
        properties: {
          variables: {
            nullable: true,
            ...getResponseSchema(camundaOpenApiSpec, '/history/variable-instance'),
          },
        },
      },
    ],
  },
});
