import type { AxiosRequestConfig } from 'axios';
import { RequestError, Response } from 'got';
import type { Got, Method, ResponseType } from 'got/dist/source';
import { pickBy } from 'lodash';

import { BadRequestError, InternalServerError, UnauthorizedError } from '$service/errors';
import { makeHttpError } from '$service/errors/HttpError';
import { sysLog } from '$service/logger';

import { checkServiceError } from './checkServiceError';

export interface MutatorOptions {
  headers?: {
    authorization?: string;
  };
}

// TODO: createDeployment API properties removed due to this bug: https://github.com/anymaniax/orval/issues/168
export const orvalGotMutator = (got: Got) => async <T>(
  config: AxiosRequestConfig,
  req?: MutatorOptions,
): Promise<T> => {
  if (config.method?.toLowerCase() === 'purge') {
    throw new Error('Method PURGE is not supported');
  }

  let responseType: ResponseType;
  switch (config.responseType) {
    case 'arraybuffer':
    case 'blob':
      responseType = 'buffer';
      break;
    case 'text':
      responseType = 'text';
      break;
    case 'document':
      throw new Error('This response type is not supported');
    case 'json':
    default:
      responseType = 'json';
  }

  const headers = config.headers ?? {};
  if (!headers.authorization) {
    headers.authorization = req?.headers?.authorization;
  }

  // got does not accept slash at the beggining of the url
  const url = config.url!.slice(1);

  if (process.env.WF_REQ_LOG_LEVEL === 'debug') {
    sysLog.info(
      'Cammunda Request: ',
      got.defaults.options.prefixUrl,
      url,
      pickBy(
        {
          method: config.method as Method,
          json: config.data,
          searchParams: config.params,
          responseType,
          isStream: config.responseType === 'stream',
          // resolveBodyOnly: true,
          // http2: false, // TODO: enable after node 16.0 upgrade
          // headers,
        },
        (k) => k != null,
      ),
    );
  }

  let body;
  try {
    body = await got(url, {
      method: config.method as Method,
      json: config.data,
      searchParams: config.params,
      responseType,
      resolveBodyOnly: true,
      isStream: config.responseType === 'stream',
      http2: false, // TODO: enable after node 16.0 upgrade
      headers,
    });
    return body;
  } catch (error) {
    sysLog.error(
      '[Got Mutator] Network Error: ',
      error,
      `Request Details: ${config.method} ${got.defaults.options.prefixUrl}${url}`,
    );

    if (error instanceof RequestError) {
      const response: Response<any> | undefined = error.response;
      if (!response) {
        throw new InternalServerError('WF Engine Errored With no Response');
      }
      sysLog.error(
        '[Got Mutator] Detailed Error is: ',
        JSON.stringify({
          statusCode: response.statusCode,
          statusMessage: response.statusMessage,
          body: response.body,
        }),
      );

      body = response.body;
      const serviceError = checkServiceError(body.message);
      if (serviceError) {
        throw new (makeHttpError(serviceError.code))(serviceError.message);
      }
      switch (response.statusCode) {
        case 401:
          throw new UnauthorizedError(body?.message);
        default:
          throw new BadRequestError(body?.message);
      }
    } else {
      throw new InternalServerError('Unkown WF Engine Error');
    }
  }
};
