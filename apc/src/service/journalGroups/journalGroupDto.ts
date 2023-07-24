import { JSONSchemaType } from '$service/validator/ajvTypes';

import { JournalGroup } from '.prisma/backend-client';

export const journalGroupDto: JSONSchemaType<JournalGroup> = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    fundId: { type: 'string' },
    publisherId: { type: 'string' },
    journalsCount: { type: 'integer' },
    createdBy: { type: 'string' },
    createdAt: { type: 'object' },
  },
  required: [
    'id',
    'title',
    'fundId',
    'publisherId',
    'journalsCount',
    'createdBy',
    'createdAt',
  ],
};

export const partialJournalGroupDto = journalGroupDto as JSONSchemaType<
  JournalGroup,
  true
>;
