import bb from 'bluebird';
import { NextApiResponse } from 'next';
import PinoHttp from 'pino-http';

import { getAuthManager } from '$service/auth/getAuthManager';
import { ExtendedToken } from '$service/auth/Token';
import {
  HttpError,
  InternalServerError,
  InvalidInputError,
  UnauthorizedError,
} from '$service/errors';
import { getTokenRolesSplitted } from '$service/groups/getTokenRolesSplitted';
import { sysLog } from '$service/logger';
import { getOpenApiComponents } from '$service/openApi/getOpenApiComponents';
import createValidator from '$service/validator/createInputValidator';

import { ApiHandler, NextAPIHandler } from './APIHandler';
import { checkRoleRestriction } from './checkRoleRestriction';
import { HTTPMethod, RouteOptions } from './RouteOptions';

const logger = PinoHttp();

export const withMiddleware = <
  TBody,
  TResponse,
  TQuery extends { [key: string]: string | string[] }
>(
  handler: ApiHandler<TBody, TResponse, TQuery>,
) => (
  options: RouteOptions<TBody, TResponse, TQuery>,
): NextAPIHandler<TBody, TResponse, TQuery> => {
  const {
    method,
    operationId,
    query: querySchema,
    body: bodySchema,
    response: responseSchema,
    roles,
    authorizationChecker,
  } = options;
  const isPublic = options.isPublic ?? false;
  const methods = Array.isArray(method) ? method : [method];
  const augmentedResponseSchema = {
    ...responseSchema,
    components: getOpenApiComponents(),
  };

  // TODO: serialize the response using AJV serializer or Fast JSON Stringify
  const queryValidator = querySchema
    ? createValidator(querySchema, `${operationId}-query`)
    : null;
  const bodyValidator = bodySchema
    ? createValidator(bodySchema, `${operationId}-body`)
    : null;
  const responseValidator = responseSchema
    ? createValidator(augmentedResponseSchema as never, `${operationId}-response`)
    : null;

  const apiFunction: NextAPIHandler<TBody, TResponse, TQuery> = async (req, res) => {
    // this validates http method types
    if (!methods.includes(req.method as HTTPMethod)) {
      res.writeHead(405, {
        Allow: methods.join(', '),
      });
      res.end(`Method ${req.method} is not allowed`);
      return;
    }

    // TODO: handle { body: object | undefined } type
    // validate query and body
    queryValidator?.(req.query);
    bodyValidator?.(req.body);

    // get user from cookie
    const authManager = await getAuthManager();
    const userToken = await authManager.verifyAndDecodeAccessToken(req);
    const extendedToken: ExtendedToken = {
      ...userToken,
      roles: getTokenRolesSplitted(userToken),
    };
    const isUserAuthenticated = userToken != null;
    // TODO: extend NextApiRequest with locals field
    (req as any).locals = {
      userToken: extendedToken,
    };
    // api role restrictions
    checkRoleRestriction(extendedToken, roles);

    // api authorization restrictions
    await authorizationChecker?.(req, { userToken: extendedToken });

    // If API is public or the user has signed in
    if (isPublic || (!isPublic && isUserAuthenticated)) {
      const response = await bb.resolve(handler(req, res, { userToken: extendedToken }));
      if (response != null) {
        try {
          responseValidator?.(response, undefined, 'Invalid API Response Shape');
        } catch (err) {
          const error = err as InvalidInputError;

          // this is an ungraceful error in production and we shouldn't leak the details
          if (process.env.NODE_ENV === 'production') {
            sysLog.error(error.message, error.extensions);
            throw new Error(error.message);
          }

          // We throw an InvalidInputError with more details in development
          throw error;
        }
        res.status(200).json(response);
      }
    } else {
      throw new UnauthorizedError();
    }
  };

  // This is the handler that will be passed to NextJS
  const nextHandler: NextAPIHandler<TBody, TResponse, TQuery> = async (req, res) => {
    try {
      await apiFunction(req, res);

      // logging api details
      if (process.env.NODE_ENV === 'production') {
        logger(req, res);
      }
    } catch (err) {
      if (err instanceof HttpError) {
        (res as NextApiResponse).status(err.statusCode).json(err.toObject());
      } else {
        const internalServerError = new InternalServerError();
        (res as NextApiResponse).status(500).json(internalServerError.toObject());

        sysLog.error(
          `API Rejected Ungracefully (${handler.name}): This Should Never Happen!`,
          err,
        );
      }
      if (process.env.NODE_ENV === 'production') {
        logger(req, res);
      }
    }
  };

  nextHandler.options = options;
  Object.defineProperty(nextHandler, 'name', { value: handler.name, writable: false });

  return nextHandler;
};
