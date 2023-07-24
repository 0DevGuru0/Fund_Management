import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { OrganizationType } from '$service/doaj/types/OrganizationType';
import {
  GetAllOrganizationsItem,
  getAllOrganizationsItemDto,
} from '$service/organizations/getAllOrganizationsItemDto';
import { getOrganizations } from '$service/organizations/getOrganizations';
import { parseQueryLimitAndSkip } from '$service/util/parseQueryLimitAndSkip';

interface Query {
  limit: string;
  skip: string;
  title: string;
  type: OrganizationType;
  [key: string]: string | string[];
}

const getOrganizationsApi: ApiHandler<any, GetAllOrganizationsItem[], Query> = async (
  req,
  res,
) => {
  const { title, type } = req.query;
  const { limit, skip } = parseQueryLimitAndSkip(req.query);

  return getOrganizations({ title, type, limit, skip }, req.headers.authorization);
};

export default withMiddleware(getOrganizationsApi)({
  operationId: 'getOrganizations',
  description: 'Get the list of Organizations',
  isPublic: true,
  method: 'GET',
  query: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        openApiIn: 'query',
        description: 'a keyword containing the title of a organization',
      },
      type: {
        type: 'string',
        openApiIn: 'query',
        description: 'enum for organization type',
        enum: ['Fund', 'Publisher', 'Institute'],
      },
      limit: { type: 'string', openApiIn: 'query', format: 'int32' },
      skip: { type: 'string', openApiIn: 'query', format: 'int32' },
    },
  },
  response: {
    type: 'array',
    nullable: true,
    items: getAllOrganizationsItemDto,
  },
});
