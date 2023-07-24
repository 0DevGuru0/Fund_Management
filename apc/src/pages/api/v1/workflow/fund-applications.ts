import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { createFundApplication } from '$service/fundApplications/createFundApplication';
import {
  CreateFundApplicationInput,
  createFundApplicationInputDto,
} from '$service/fundApplications/createFundApplicationInputDto';

interface Query {
  [key: string]: string | string[];
}

const createFundApplicationApi: ApiHandler<
  CreateFundApplicationInput,
  string,
  Query
> = async (req, res) => {
  return createFundApplication(req.body);
};

export default withMiddleware(createFundApplicationApi)({
  operationId: 'createFundApplication',
  description: 'Create A New Fund Application',
  method: 'POST',
  isPublic: true,
  body: createFundApplicationInputDto,
  response: {
    type: 'string',
    format: 'int32',
    description: 'Returns Fund Application ID',
  },
});
