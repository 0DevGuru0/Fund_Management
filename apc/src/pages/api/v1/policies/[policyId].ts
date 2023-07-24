import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { checkAuthForPolicyChange } from '$service/policies/checkAuthForPolicyChange';
import { policyDto } from '$service/policies/policyDto';
import { updatePolicy } from '$service/policies/updatePolicy';

import { Policy } from '.prisma/backend-client';

interface Query {
  policyId: string;
  [key: string]: string | string[];
}

interface Body {
  isActive: boolean;
}

const updatePolicyApi: ApiHandler<Body, Policy, Query> = async (req, res, ctx) => {
  const { isActive } = req.body;
  const { policyId } = req.query;

  return updatePolicy({
    policyId,
    isActive,
  });
};

export default withMiddleware(updatePolicyApi)({
  operationId: 'updatePolicy',
  method: 'PUT',
  description: 'update a policy by id(isActive change supported for now)',
  authorizationChecker: checkAuthForPolicyChange,
  query: {
    type: 'object',
    properties: {
      policyId: {
        type: 'string',
        openApiIn: 'path',
      },
    },
    required: ['policyId'],
  },
  body: {
    type: 'object',
    properties: {
      isActive: {
        type: 'boolean',
      },
    },
    required: ['isActive'],
  },
  response: policyDto,
});
