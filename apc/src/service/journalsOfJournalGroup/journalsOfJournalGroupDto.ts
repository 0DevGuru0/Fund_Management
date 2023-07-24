import { JSONSchemaType } from '$service/validator/ajvTypes';

import { JournalsOfJournalGroup } from '.prisma/backend-client';

export const journalsOfJournalGroupDto: JSONSchemaType<JournalsOfJournalGroup> = {
  type: 'object',
  properties: {
    journalGroupId: { type: 'string' },
    journalId: { type: 'string' },
    batchId: { type: 'string' },
    assignedBy: { type: 'string' },
    assignedAt: { type: 'object' },
  },
  nullable: true,
  required: ['journalGroupId', 'journalId', 'batchId', 'assignedBy', 'assignedAt'],
};
