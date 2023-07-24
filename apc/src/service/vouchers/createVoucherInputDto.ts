import { JSONSchemaType } from '$service/validator/ajvTypes';

export interface CreateVoucherInput {
  code: string;
  publisherId: string;
  usableAfter?: string;
  expiresAt?: string;
  note?: string;
}

export const createVoucherInputDto: JSONSchemaType<CreateVoucherInput> = {
  type: 'object',
  properties: {
    code: {
      type: 'string',
    },
    publisherId: {
      type: 'string',
    },
    usableAfter: {
      type: 'string',
      format: 'date-time',
      example: '2021-08-21T10:06:39.341Z',
      nullable: true,
    },
    expiresAt: {
      type: 'string',
      format: 'date-time',
      example: '2021-08-21T10:06:39.341Z',
      nullable: true,
    },
    note: {
      type: 'string',
      nullable: true,
    },
  },
  required: ['code', 'publisherId'] as never[],
};
