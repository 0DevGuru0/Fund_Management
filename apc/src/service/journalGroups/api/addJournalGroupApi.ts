import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { createJournalGroup } from '$service/journalGroups/createJournalGroup';
import { journalGroupDto } from '$service/journalGroups/journalGroupDto';
import { checkAuthForUsingFundId } from '$service/organizations/checkAuthForUsingFundId';

import { JournalGroup } from '.prisma/backend-client';

interface Query {
  [key: string]: string | string[];
}

interface Body {
  title: string;
  fundId: string;
  publisherId: string;
}

const createJournalGroupApi: ApiHandler<Body, JournalGroup, Query> = async (
  req,
  res,
  ctx,
) => {
  const { title, fundId, publisherId } = req.body;

  return createJournalGroup(
    {
      fundId,
      publisherId,
      title,
      createdBy: ctx.userToken.preferred_username!,
    },
    req.headers.authorization!,
  );
};

export default withMiddleware(createJournalGroupApi)({
  operationId: 'addJournalGroup',
  method: 'POST',
  description: 'add a journal group',
  authorizationChecker: checkAuthForUsingFundId,
  body: {
    type: 'object',
    properties: {
      publisherId: {
        type: 'string',
      },
      fundId: {
        type: 'string',
      },
      title: {
        type: 'string',
      },
    },
    required: ['publisherId', 'fundId', 'title'],
  },
  response: journalGroupDto,
});
