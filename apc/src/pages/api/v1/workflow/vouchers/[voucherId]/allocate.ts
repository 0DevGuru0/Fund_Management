import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import {
  releaseOrAllocateVoucher,
  VoucherNextStatus,
} from '$service/vouchers/releaseOrAllocateVoucher';
import { voucherDto } from '$service/vouchers/voucherDto';

import { Voucher } from '.prisma/backend-client';

interface Query {
  voucherId: string;
  [key: string]: string | string[];
}

const allocateVoucherApi: ApiHandler<any, Voucher, Query> = async (req, res, ctx) => {
  const { voucherId } = req.query;
  return releaseOrAllocateVoucher(voucherId, VoucherNextStatus.ALLOCATED);
};

export default withMiddleware(allocateVoucherApi)({
  operationId: 'allocateVoucher',
  description: 'allocate voucher',
  method: 'POST',
  isPublic: true,
  query: {
    type: 'object',
    properties: {
      voucherId: {
        type: 'string',
        openApiIn: 'path',
      },
    },
    required: ['voucherId'],
  },
  response: voucherDto,
});
