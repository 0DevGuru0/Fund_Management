import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import {
  getCamundaPlatformRESTAPI,
  ProcessInstanceWithVariablesDto,
} from '$service/generated/wfCamunda';
import { getResponseSchema } from '$service/openApi/api/getPathResponseType';
import camundaOpenApiSpec from '$service/wfEngine/camunda-7-15.openapi.json';
import { getStartFormConfigByIdentity } from '$service/wfEngine/getStartFormConfigByIdentity';
import { mapProcessIdentityToKey } from '$service/wfEngine/mapProcessIdentityToKey';
import { validateFormData } from '$service/wfEngine/validateFormData';

interface Query {
  processIdentity: string;
  [key: string]: string | string[];
}

interface Body {
  data: any;
}

const { startProcessInstanceByKey } = getCamundaPlatformRESTAPI();

const tasks: ApiHandler<Body, ProcessInstanceWithVariablesDto, Query> = async (
  req,
  res,
  ctx,
) => {
  const { processIdentity } = req.query;
  const { data } = req.body;

  const processDefinitionKey = await mapProcessIdentityToKey(processIdentity, req);

  const config = await getStartFormConfigByIdentity(processDefinitionKey, req);
  await validateFormData(config, data);

  const userToken = ctx.userToken!;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { iat, exp, ...user } = userToken;
  data.startedBy = user;

  const variables: Record<string, any> = {};
  for (const key of Object.keys(data)) {
    variables[key] = {
      value: data[key],
    };
  }

  const result = await startProcessInstanceByKey(
    processDefinitionKey,
    { variables },
    req,
  );

  return result;
};

export default withMiddleware(tasks)({
  operationId: 'startProcessInstance',
  description: 'start a process Instance',
  method: 'POST',
  query: {
    type: 'object',
    properties: {
      processIdentity: {
        type: 'string',
        openApiIn: 'path',
      },
    },
    required: ['processIdentity'],
  },
  body: {
    type: 'object',
    properties: {
      data: {
        type: 'object',
        nullable: true,
      },
    },
  },
  response: getResponseSchema(
    camundaOpenApiSpec,
    '/process-definition/key/{key}/start',
    'post',
  ),
});
