import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import deleteAllOrganizations from '$service/organizations/deleteAllOrganizations';

const deleteOrganizations: ApiHandler = async (req, res) => {
  await deleteAllOrganizations();

  return {
    message: 'BulkDelete process is finished',
  };
};

export default withMiddleware(deleteOrganizations)({
  operationId: 'deleteAllOrganizations',
  description: 'Delete all organizations from Repository',
  method: 'DELETE',
  response: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        nullable: true,
      },
    },
  },
});
