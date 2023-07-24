// eslint-disable-next-line max-classes-per-file
import http from 'http';

export class HttpError extends Error {
  statusCode: number;
  code: string;
  extensions: Record<string, any> | undefined;
  constructor(
    statusCode: number,
    message?: string,
    code?: string,
    extensions?: Record<string, any>,
  ) {
    super(message ?? http.STATUS_CODES[statusCode]);
    this.statusCode = statusCode;
    this.code = code ?? this.constructor.name;
    this.extensions = extensions;
  }

  toObject = (): object => ({
    statusCode: this.statusCode,
    code: this.code,
    message: this.message,
    extensions: this.extensions,
  });
}

type HTTPErrorClass = new (
  message?: string,
  opts?: { code?: string; extensions?: Record<string, any> },
) => HttpError;

export const makeHttpError = (statusCode: number): HTTPErrorClass =>
  class extends HttpError {
    constructor(
      message?: string,
      opts?: { code?: string; extensions?: Record<string, any> },
    ) {
      super(statusCode, message, opts?.code, opts?.extensions);
    }
  };
