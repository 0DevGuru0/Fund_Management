import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { reserveVoucher } from '$service/vouchers/reserveVoucher';
import { voucherDto } from '$service/vouchers/voucherDto';

import { Voucher } from '.prisma/backend-client';

interface Query {
  fundApplicationId: string;
  [key: string]: string | string[];
}

const reserveVoucherApi: ApiHandler<any, Voucher, Query> = async (req, res, ctx) => {
  const { fundApplicationId: stringFundApplicationId } = req.query;
  const fundApplicationId = parseInt(stringFundApplicationId, 10);
  return reserveVoucher(fundApplicationId);
};

export default withMiddleware(reserveVoucherApi)({
  operationId: 'reserveVoucher',
  description: 'reserve voucher',
  method: 'POST',
  isPublic: true,
  query: {
    type: 'object',
    properties: {
      fundApplicationId: {
        type: 'string',
        format: 'int32',
        openApiIn: 'query',
      },
    },
    required: ['fundApplicationId'],
  },
  response: voucherDto,
});
