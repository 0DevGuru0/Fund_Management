import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import deleteAllJournals from '$service/journals/deleteAllJournals';

const deleteJournals: ApiHandler = async (req, res) => {
  await deleteAllJournals();

  return {
    message: 'BulkDelete process is finished',
  };
};

export default withMiddleware(deleteJournals)({
  operationId: 'deleteAllJournals',
  description: 'Delete all journals from Repository',
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
