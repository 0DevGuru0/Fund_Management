import { v4 } from 'uuid';

import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { Role } from '$service/groups/Role';
import { journalGroupDto } from '$service/journalGroups/journalGroupDto';
import { addJournalsToJournalGroup } from '$service/journalsOfJournalGroup/addJournalsToJournalGroup';

import { JournalGroup } from '.prisma/backend-client';

interface Query {
  journalGroupId: string;
  [key: string]: string | string[];
}

interface Body {
  journalIds: string[];
  batchId: string;
}

interface Response {
  additionCount: number;
  journalGroup: JournalGroup;
}

const addJournalsToJournalGroupApi: ApiHandler<Body, Response, Query> = async (
  req,
  res,
  ctx,
) => {
  const { journalGroupId } = req.query;
  const { journalIds, batchId: providedBatchId } = req.body;
  const batchId = providedBatchId ?? v4();

  return addJournalsToJournalGroup(
    {
      journalIds,
      journalGroupId,
      batchId,
      assignedBy: ctx.userToken.preferred_username!,
    },
    req.headers.authorization!,
  );
};

export default withMiddleware(addJournalsToJournalGroupApi)({
  operationId: 'addJournalsToJournalGroup',
  method: 'POST',
  description: 'add journal membership in a group',
  roles: [Role.SystemAdmin, Role.FundManager],
  query: {
    type: 'object',
    properties: {
      journalGroupId: {
        type: 'string',
        format: 'uuid',
        openApiIn: 'path',
      },
    },
    required: ['journalGroupId'],
  },
  body: {
    type: 'object',
    properties: {
      journalIds: {
        type: 'array',
        items: {
          type: 'string',
        },
        minItems: 1,
      },
      batchId: {
        type: 'string',
        format: 'uuid',
      },
    },
    required: ['journalIds'],
  },
  response: {
    type: 'object',
    properties: {
      additionCount: {
        type: 'integer',
        nullable: true,
      },
      journalGroup: journalGroupDto,
    },
  },
});
