import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { Role } from '$service/groups/Role';
import { journalGroupDto } from '$service/journalGroups/journalGroupDto';
import { removeJournalsFromJournalGroup } from '$service/journalsOfJournalGroup/removeJournalsFromJournalGroup';

import { JournalGroup } from '.prisma/backend-client';

interface Query {
  journalGroupId: string;
  [key: string]: string | string[];
}

interface Body {
  journalIds: string[];
}

interface Response {
  deletionCount: number;
  journalGroup: JournalGroup;
}

const removeJournalsFromJournalGroupApi: ApiHandler<Body, Response, Query> = async (
  req,
) => {
  const { journalGroupId } = req.query;
  const { journalIds } = req.body;
  return removeJournalsFromJournalGroup({
    journalGroupId,
    journalIds,
  });
};

export default withMiddleware(removeJournalsFromJournalGroupApi)({
  operationId: 'removeJournalsFromJournalGroup',
  method: 'POST',
  description: 'remove journal membership from a group',
  roles: [Role.SystemAdmin],
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
    },
    required: ['journalIds'],
  },
  response: {
    type: 'object',
    properties: {
      deletionCount: {
        type: 'integer',
        nullable: true,
      },
      journalGroup: journalGroupDto,
    },
  },
});
