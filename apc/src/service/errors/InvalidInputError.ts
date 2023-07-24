import { BadRequestError } from './basicHttpErrors';

export interface InvalidInputInfo {
  path: string;
  message: string;
  code: string;
}

export class InvalidInputError extends BadRequestError {
  constructor(error: any | InvalidInputInfo[], message = 'Invalid Input') {
    let extensions: InvalidInputInfo[] = [];
    if (Array.isArray(error)) {
      extensions = error;
    } else if (error.validation) {
      extensions = error.validation.map((detail) => ({
        path: detail.dataPath,
        message: detail.message,
        code: detail.keyword,
      }));
    }
    super(message, { extensions });
  }
}
