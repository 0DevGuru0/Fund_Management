import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { BadRequestError } from '$service/errors';
import {
  updateFundApplication,
  UpdateFundApplicationInput,
} from '$service/fundApplications/updateFundApplication';

interface Query {
  fundApplicationId: string;
  [key: string]: string | string[];
}

const updateFundApplicationApi: ApiHandler<
  UpdateFundApplicationInput,
  any,
  Query
> = async (req, res, ctx) => {
  const { fundApplicationId } = req.query;
  const fundApplicationIdInteger = parseInt(fundApplicationId, 10);
  if (isNaN(fundApplicationIdInteger)) {
    throw new BadRequestError('fundApplicationId should be in integer format');
  }
  await updateFundApplication(fundApplicationIdInteger, req.body);
  return 'fundApplication updated';
};

export default withMiddleware(updateFundApplicationApi)({
  operationId: 'updateFundApplication',
  description: 'updating fund application with partial data',
  method: 'PUT',
  isPublic: true,
  query: {
    type: 'object',
    properties: {
      fundApplicationId: {
        type: 'string',
        format: 'int32',
        openApiIn: 'path',
      },
    },
    required: ['fundApplicationId'],
  },
  body: {
    type: 'object',
    properties: {
      state: {
        type: 'string',
        nullable: true,
      },
      variables: {
        type: 'object',
        nullable: true,
      },
    },
  },
  response: {
    type: 'string',
  },
});
