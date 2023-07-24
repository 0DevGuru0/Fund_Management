import { GetJournalsByPublisherIdQuery } from '$service/generated/repoGqlTypes';
import { JSONSchemaType } from '$service/validator/ajvTypes';

export type GetJournalsByPublisherId = GetItemTypeFromQueryType<
  GetJournalsByPublisherIdQuery,
  'Journal'
>;

export const getJournalsByPublisherIdDto: JSONSchemaType<GetJournalsByPublisherId> = {
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
  },
  required: ['title', 'id'],
};
