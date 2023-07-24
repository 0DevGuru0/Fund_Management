import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { Budget, budgetDto } from '$service/budgets/budgetDto';
import { cancelBudgetReservation } from '$service/budgets/cancelBudgetReservation';

interface Query {
  budgetId: string;
  [key: string]: string | string[];
}

const cancelBudget: ApiHandler<any, Budget, Query> = async (req, res, ctx) => {
  const { budgetId } = req.query;
  return cancelBudgetReservation(budgetId);
};

export default withMiddleware(cancelBudget)({
  operationId: 'cancelBudget',
  description: 'cancel budget reservation',
  method: 'PUT',
  isPublic: true,
  query: {
    type: 'object',
    properties: {
      budgetId: {
        type: 'string',
        openApiIn: 'path',
      },
    },
    required: ['budgetId'],
  },
  response: budgetDto,
});
