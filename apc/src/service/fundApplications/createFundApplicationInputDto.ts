import { JSONSchemaType } from '$service/validator/ajvTypes';

export interface CreateFundApplicationInput {
  articleTitle: string;
  articleFile: {
    storage: 'base64' | 'url';
    name: string;
    size: number;
    type: string;
    url: string;
    originalName?: string;
  };
  userId: string;
  policyId: string;
  processInstanceId: string;
  fundId: string;
  publisherId: string;
  journalId: string;
  affiliationId: string;
  publishPrice: number;
  currency: string;
  state: string;
}

export const createFundApplicationInputDto: JSONSchemaType<CreateFundApplicationInput> = {
  type: 'object',
  properties: {
    articleTitle: { type: 'string' },
    articleFile: {
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
    userId: { type: 'string' },
    policyId: { type: 'string' },
    processInstanceId: { type: 'string' },
    fundId: { type: 'string' },
    publisherId: { type: 'string' },
    journalId: { type: 'string' },
    affiliationId: { type: 'string' },
    publishPrice: { type: 'number' },
    currency: { type: 'string' },
    state: { type: 'string' },
  },
  required: [
    'articleTitle',
    'articleFile',
    'userId',
    'policyId',
    'processInstanceId',
    'fundId',
    'publisherId',
    'journalId',
    'affiliationId',
    'publishPrice',
    'currency',
    'state',
  ],
};
