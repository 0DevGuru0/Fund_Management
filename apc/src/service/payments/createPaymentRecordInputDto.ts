import { Currency } from '$service/currencies/Currency';
import { JSONSchemaType } from '$service/validator/ajvTypes';

export interface CreatePaymentRecordInput {
  currency: Currency;
  note?: string;
  amount: number;
  trackingCode: string;
  paidBy: string;
  paidAt: string;
  accountDetails: Record<string, any>;
  receipt: {
    storage: 'base64' | 'url';
    name: string;
    size: number;
    type: string;
    url: string;
    originalName?: string;
  };
}

export const createPaymentRecordInputDto: JSONSchemaType<CreatePaymentRecordInput> = {
  type: 'object',
  properties: {
    currency: {
      type: 'string',
      enum: Object.values(Currency),
    },
    note: {
      type: 'string',
      nullable: true,
    },
    amount: {
      type: 'number',
      minimum: 0,
    },
    trackingCode: {
      type: 'string',
    },
    paidBy: {
      type: 'string',
    },
    paidAt: {
      type: 'string',
      format: 'date-time',
    },
    accountDetails: {
      type: 'object',
    },
    receipt: {
      type: 'object',
      properties: {
        storage: { enum: ['base64', 'url'] } as any,
        name: { type: 'string' },
        size: { type: 'number' },
        type: { type: 'string' },
        url: { type: 'string' },
        originalName: { type: 'string', nullable: true },
      },
      require: ['name', 'storage', 'size', 'type', 'url'],
    },
  },
  required: [
    'currency',
    'amount',
    'trackingCode',
    'paidBy',
    'paidAt',
    'accountDetails',
    'receipt',
  ],
};
