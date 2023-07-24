import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { BadRequestError } from '$service/errors';
import { getResearcherInfoByOrcidId } from '$service/orcid/getResearcherInfoByOrcidId';

interface Query {
  orcidId: string;
  [key: string]: string | string[];
}

interface Response {
  isValid: boolean;
}

const validateOrcidIdApi: ApiHandler<any, Response, Query> = async (req, res, ctx) => {
  const { orcidId: queryOrcidId } = req.query;
  const { orcid: tokenOrcidId } = ctx.userToken!;
  const nullableQueryOrcidId = queryOrcidId as string | undefined;
  const requestedOrcidId = nullableQueryOrcidId ?? tokenOrcidId;
  if (!requestedOrcidId) {
    throw new BadRequestError();
  }
  const researcherInfo = await getResearcherInfoByOrcidId(requestedOrcidId.toString());
  return {
    isValid: researcherInfo !== null,
  };
};

export default withMiddleware(validateOrcidIdApi)({
  operationId: 'validateOrcid',
  description: 'validate orcid',
  method: 'GET',
  query: {
    type: 'object',
    properties: {
      orcidId: {
        type: 'string',
        openApiIn: 'query',
        nullable: true,
      },
    },
  },
  response: {
    type: 'object',
    properties: {
      isValid: {
        type: 'boolean',
      },
    },
  },
});
