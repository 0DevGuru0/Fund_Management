import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { generateFundApplicationReportUrl } from '$service/fundApplications/generateFundApplicationReportUrl';
import {
  GetFundApplicationsReportQuery,
  getFundApplicationsReportQueryDto,
} from '$service/fundApplications/getFundApplicationsDto';
import { Role } from '$service/groups/Role';

const getFundApplicationsReport: ApiHandler<
  any,
  string,
  GetFundApplicationsReportQuery
> = async (req, res, ctx) => {
  return generateFundApplicationReportUrl(req.query, ctx.userToken.roles);
};

export default withMiddleware(getFundApplicationsReport)({
  operationId: 'getFundApplicationsReport',
  description: 'get the list of fund applications report',
  method: 'GET',
  roles: [
    Role.SystemAdmin,
    Role.FundFinancialManager,
    Role.FundManager,
    Role.PublisherAdmin,
  ],
  query: getFundApplicationsReportQueryDto,
  response: {
    type: 'string',
  },
});
