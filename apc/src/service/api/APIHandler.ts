import { NextApiRequest, NextApiResponse } from 'next';

import { IContext } from '$api/IContext';

import { RouteOptions } from './RouteOptions';

export type QueryObject = Record<string, string | string[]>;
export interface NextAPIHandler<
  TBody = any,
  TResponse = any,
  TQuery extends QueryObject = QueryObject
> {
  (
    req: TypedRequest<TBody, TQuery>,
    res: NextApiResponse<TResponse>,
  ): void | Promise<void>;
  options?: RouteOptions<TBody, TResponse, TQuery>;
}

export type ApiHandler<
  TBody = any,
  TResponse = any,
  TQuery extends QueryObject = QueryObject
> = (
  req: TypedRequest<TBody, TQuery>,
  res: NextApiResponse<TResponse>,
  ctx: IContext,
) => Promise<TResponse | void> | (TResponse | void);

export type ApiAuthorizationChecker<
  TBody = any,
  TQuery extends QueryObject = QueryObject
> = (req: TypedRequest<TBody, TQuery>, ctx: IContext) => Promise<void>;

export interface TypedRequest<TBody, TQuery extends QueryObject> extends NextApiRequest {
  body: TBody;
  query: TQuery;
}
