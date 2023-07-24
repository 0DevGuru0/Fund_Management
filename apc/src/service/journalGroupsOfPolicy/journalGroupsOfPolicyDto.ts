import { JSONSchemaType } from '$service/validator/ajvTypes';

import { JournalGroupsOfPolicy } from '.prisma/backend-client';

export const journalGroupsOfPolicyDto: JSONSchemaType<JournalGroupsOfPolicy> = {
  type: 'object',
  properties: {
    policyId: { type: 'string' },
    journalGroupId: { type: 'string' },
    assignedBy: { type: 'string' },
    assignedAt: { type: 'object' },
  },
  required: ['journalGroupId', 'policyId', 'assignedBy', 'assignedAt'],
};

export const partialJournalGroupsOfPolicyDto = journalGroupsOfPolicyDto as JSONSchemaType<
  JournalGroupsOfPolicy,
  true
>;
