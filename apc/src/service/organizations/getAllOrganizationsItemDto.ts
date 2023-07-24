import { GetAllOrganizationsQuery } from '$service/generated/repoGqlTypes';
import { JSONSchemaType } from '$service/validator/ajvTypes';

export type GetAllOrganizationsItem = GetItemTypeFromQueryType<
  GetAllOrganizationsQuery,
  'Organization'
>;

export const getAllOrganizationsItemDto: JSONSchemaType<GetAllOrganizationsItem> = {
  type: 'object',
  properties: {
    __typename: {
      type: 'string',
      nullable: true,
    },
    title: {
      type: 'string',
    },
    id: {
      type: 'string',
    },
    url: {
      type: 'string',
      nullable: true,
    },
    type: {
      type: 'string',
    },
    description: {
      type: 'string',
      nullable: true,
    },
    email: {
      type: 'string',
      nullable: true,
    },
  },
  required: ['id', 'title', 'type'],
};
