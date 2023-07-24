import { GetAllJournalsQuery } from '$service/generated/repoGqlTypes';
import { JSONSchemaType } from '$service/validator/ajvTypes';

export type GetAllJournalsItem = GetItemTypeFromQueryType<GetAllJournalsQuery, 'Journal'>;

export const getAllJournalsItemDto: JSONSchemaType<GetAllJournalsItem> = {
  type: 'object',
  properties: {
    __typename: {
      type: 'string',
      nullable: true,
    },
    publisher: {
      type: 'object',
      properties: {
        __typename: { type: 'string', nullable: true },
        title: { type: 'string' },
      },
    },
    title: {
      type: 'string',
    },
    parentId: {
      type: 'string',
    },
    externalId: {
      type: 'string',
      nullable: true,
    },
    _id: {
      type: 'string',
    },
    createdAt: {
      type: 'string',
    },
    updatedAt: {
      type: 'string',
    },
    alternativeTitle: {
      type: 'string',
      nullable: true,
    },
    printISSN: {
      type: 'string',
      nullable: true,
    },
    onlineISSN: {
      type: 'string',
      nullable: true,
    },
    subjects: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    url: {
      type: 'string',
      nullable: true,
    },
    scope: {
      type: 'string',
      nullable: true,
    },
    apc: {
      type: 'boolean',
    },
    apcPrice: {
      type: 'integer',
      nullable: true,
    },
    currency: {
      type: 'string',
      nullable: true,
    },
    sjrQuartile: {
      type: 'string',
      nullable: true,
    },
    jcrQuartile: {
      type: 'string',
      nullable: true,
    },
    embargo: {
      type: 'integer',
      nullable: true,
    },
    licenseType: {
      type: 'array',
      items: {
        type: 'string',
      },
      nullable: true,
    },
    licenseAttribute: {
      type: 'string',
      nullable: true,
    },
    keywords: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    languages: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    reviewProcess: {
      type: 'array',
      items: {
        type: 'string',
      },
      nullable: true,
    },
  },
  nullable: true,
  required: [
    'title',
    'parentId',
    'publisher',
    '_id',
    'createdAt',
    'updatedAt',
    'subjects',
    'apc',
    'keywords',
    'languages',
  ],
};
