import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { getCamundaPlatformRESTAPI } from '$service/generated/wfCamunda';
import { getTaskFormConfigById } from '$service/wfEngine/getTaskFormConfigById';
import { validateFormData } from '$service/wfEngine/validateFormData';

interface Query {
  taskId: string;
  [key: string]: string | string[];
}

interface Body {
  data: any;
}

interface Response {
  message: string;
}

const { submit } = getCamundaPlatformRESTAPI();

const tasks: ApiHandler<Body, Response, Query> = async (req, res, ctx) => {
  const { taskId } = req.query;
  const { data } = req.body;

  const config = await getTaskFormConfigById(taskId, req);

  await validateFormData(config, data);

  for (const key of Object.keys(data)) {
    data[key] = {
      value: data[key],
    };
  }
  await submit(taskId, { variables: data }, req);
  return {
    message: 'form has submitted',
  };
};

export default withMiddleware(tasks)({
  operationId: 'submitForm',
  description: 'submit form',
  method: 'POST',
  query: {
    type: 'object',
    properties: {
      taskId: {
        type: 'string',
        openApiIn: 'path',
        format: 'uuid',
      },
    },
    required: ['taskId'],
  },
  body: {
    type: 'object',
    properties: {
      data: {
        type: 'object',
        nullable: true,
      },
    },
    required: ['data'] as never[],
  },
  response: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        nullable: true,
      },
    },
  },
});
