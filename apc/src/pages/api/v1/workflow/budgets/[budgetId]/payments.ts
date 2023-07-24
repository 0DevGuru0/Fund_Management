import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { createPaymentRecord } from '$service/payments/createPaymentRecord';
import {
  CreatePaymentRecordInput,
  createPaymentRecordInputDto,
} from '$service/payments/createPaymentRecordInputDto';

import { Prisma } from '.prisma/backend-client';

interface Query {
  budgetId: string;
  [key: string]: string | string[];
}

interface Response {
  paymentRecordId: string;
}

const createPaymentRecordApi: ApiHandler<
  CreatePaymentRecordInput,
  Response,
  Query
> = async (req, res, ctx) => {
  const { budgetId } = req.query;
  const { receipt } = req.body;
  const receiptJson = (receipt as unknown) as Prisma.InputJsonValue;

  const paymentRecord = await createPaymentRecord(budgetId, {
    ...req.body,
    receipt: receiptJson,
  });

  return { paymentRecordId: paymentRecord.id };
};

export default withMiddleware(createPaymentRecordApi)({
  operationId: 'createPaymentRecord',
  description: 'create payment record associated with a budget allocation',
  method: 'POST',
  isPublic: true,
  query: {
    type: 'object',
    properties: {
      budgetId: {
        type: 'string',
        openApiIn: 'path',
      },
    },
    required: ['budgetId'],
  },
  body: createPaymentRecordInputDto,
  response: {
    type: 'object',
    properties: {
      paymentRecordId: {
        type: 'string',
      },
    },
  },
});
