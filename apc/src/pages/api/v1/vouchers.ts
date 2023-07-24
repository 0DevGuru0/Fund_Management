import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { Role } from '$service/groups/Role';
import { getVoucherById } from '$service/vouchers/getVoucherById';
import { voucherDto } from '$service/vouchers/voucherDto';

import { Voucher } from '.prisma/backend-client';

interface Query {
  voucherId: string;
  [k: string]: string | string[];
}

const getVoucherByIdApi: ApiHandler<any, Voucher | null, Query> = async (req) =>
  getVoucherById(req.query);

export default withMiddleware(getVoucherByIdApi)({
  operationId: 'getVoucherById',
  roles: [Role.FundFinancialManager, Role.FundManager, Role.SystemAdmin],
  method: 'GET',
  description: 'get voucher by ID',
  query: {
    type: 'object',
    properties: {
      voucherId: {
        type: 'string',
        format: 'uuid',
        openApiIn: 'query',
      },
    },
    required: ['voucherId'],
  },
  response: voucherDto,
});
