import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { fundApplicationDto } from '$service/fundApplications/fundApplicationDto';
import {
  getFundApplications,
  Result,
} from '$service/fundApplications/getFundApplication';
import {
  GetFundApplicationsQuery,
  getFundApplicationsQueryDto,
} from '$service/fundApplications/getFundApplicationsDto';
import { parseQueryLimitAndSkip } from '$service/util/parseQueryLimitAndSkip';

const getFundApplicationsApi: ApiHandler<any, Result, GetFundApplicationsQuery> = async (
  req,
  res,
  ctx,
) => {
  const { fields } = req.query;
  const { limit, skip } = parseQueryLimitAndSkip(req.query);
  const fieldsArray = fields ? fields.split(',') : [];

  return getFundApplications({
    ...req.query,
    fieldsArray,
    limit,
    skip,
    roles: ctx.userToken.roles,
  });
};

export default withMiddleware(getFundApplicationsApi)({
  operationId: 'getFundApplications',
  description: 'Get the list of fund applications',
  method: 'GET',
  query: getFundApplicationsQueryDto,
  response: {
    type: 'object',
    properties: {
      fundApplications: {
        type: 'array',
        items: fundApplicationDto,
      },
      count: {
        type: 'integer',
      },
      totalPrice: {
        type: 'string',
      },
    },
  },
});
