import { Role } from '$service/groups/Role';
import { JSONSchemaType } from '$service/validator/ajvTypes';

import { ApiAuthorizationChecker, QueryObject } from './APIHandler';

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD';

export interface RouteSchema<TBody, TResponse, TQuery> {
  body?: JSONSchemaType<TBody>;
  response?: JSONSchemaType<TResponse>;
  query?: JSONSchemaType<TQuery, false, true>;
}

export interface RouteOptions<TBody, TResponse, TQuery extends QueryObject = QueryObject>
  extends RouteSchema<TBody, TResponse, TQuery> {
  description: string;
  method: HTTPMethod[] | HTTPMethod;
  operationId: string;
  tag?: string;
  isPublic?: boolean;
  isApiKeyProtected?: boolean;
  roles?: Role[];
  authorizationChecker?: ApiAuthorizationChecker<TBody, TQuery>;
}
