import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { reserveBudget } from '$service/budgets/reserveBudget';
import { Currency } from '$service/currencies/Currency';

interface Query {
  [key: string]: string | string[];
}

interface Body {
  fundApplicationId: number;
  currency: Currency;
  note?: string;
  amount: number;
}

interface Response {
  budgetId: string;
}

const reserveBudgetApi: ApiHandler<Body, Response, Query> = async (req, res, ctx) => {
  const budget = await reserveBudget(req.body);

  return { budgetId: budget.id };
};

export default withMiddleware(reserveBudgetApi)({
  operationId: 'reserveBudget',
  description: 'reserve budget',
  method: 'POST',
  isPublic: true,
  body: {
    type: 'object',
    properties: {
      fundApplicationId: {
        type: 'integer',
      },
      currency: {
        type: 'string',
        enum: Object.values(Currency),
      },
      note: {
        type: 'string',
        nullable: true,
      },
      amount: {
        type: 'number',
        exclusiveMinimum: 0,
      },
    },
    required: ['amount', 'currency', 'fundApplicationId'],
  },
  response: {
    type: 'object',
    properties: {
      budgetId: {
        type: 'string',
      },
    },
  },
});
