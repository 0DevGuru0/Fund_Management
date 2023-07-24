import { keyBy } from 'lodash';

import { NextAPIHandler } from './APIHandler';
import { HTTPMethod } from './RouteOptions';

// TODO: JSONSchemaType<any> does not extend JSONSchemaType<T> so I had to set the type as any (which is not safe!)
/**
 * The provided handlers should be created by withMiddleware function
 * @returns standard next.js handler
 */
export const combineHandlers = (...handlerFuncs: any[]): NextAPIHandler => {
  const handlers = handlerFuncs as NextAPIHandler[];

  // TODO: validate methodHandlers, check for duplicate method handlers + check for invalid methods
  const methodHandlers = keyBy(handlers, ({ options }) => options?.method);
  const allMethods = Object.keys(methodHandlers);

  const nextHandler: NextAPIHandler = (req, res) => {
    const reqMethod = req.method as HTTPMethod;
    if (!allMethods.includes(reqMethod)) {
      res.writeHead(405, {
        Allow: allMethods.join(', '),
      });
      res.end(`Method ${req.method} is not allowed`);
      return;
    }

    // `as NextAPIHandler` is because of bad lodash keyBy typing
    const handler = methodHandlers[reqMethod] as NextAPIHandler;
    return handler(req, res);
  };

  nextHandler.options = handlers.map(({ options }) => options) as any;

  return nextHandler;
};
