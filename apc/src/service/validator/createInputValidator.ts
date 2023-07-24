import { ErrorObject } from 'ajv';
import { DataValidationCxt } from 'ajv/dist/types';
import { isUndefined } from 'lodash';

import ajv from './ajv';
import { JSONSchemaType } from './ajvTypes';

import { InvalidInputError, InvalidInputInfo } from '$errors';

type ValidateFunction<T> = (
  data: T,
  dataCxt?: DataValidationCxt,
  message?: string,
) => void;

export const formatAjvErrors = (
  errors: ErrorObject<string, Record<string, unknown>, unknown>[],
): InvalidInputInfo[] =>
  errors.map((error) => ({
    code: error.keyword,
    message: error.message ?? error.keyword,
    path: (error.instancePath || error.schemaPath || '').replace(/\//g, '.'),
  }));

export default <T, K extends boolean>(
  schema: JSONSchemaType<T, K>,
  operationId: string,
): ValidateFunction<T> => {
  let validate = ajv.getSchema<JSONSchemaType<T, true, false>>(operationId);

  if (isUndefined(validate)) {
    ajv.addSchema(schema, operationId);
    validate = ajv.getSchema<JSONSchemaType<T, true, false>>(operationId);
  }

  return (data, dataCxt, message) => {
    validate?.(data, dataCxt);
    if (validate?.errors) {
      throw new InvalidInputError(formatAjvErrors(validate.errors), message);
    }
  };
};
