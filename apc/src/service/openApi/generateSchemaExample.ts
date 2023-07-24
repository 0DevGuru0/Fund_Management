import refParser from '@apidevtools/json-schema-ref-parser';
import faker from 'faker/locale/en_US';
import { format, option, extend, generate } from 'json-schema-faker';

import { sysLog } from '$service/logger';

extend('faker', () => {
  faker.locale = 'en_US';
  return faker;
});
option('alwaysFakeOptionals', true);
format('int32', () => parseInt(`${Math.random() * 1000}`, 10));

interface Schema {
  example?: Record<string, any>;
  [key: string]: any;
}

export const generateSchemaExample = async <T extends Schema>(
  schema: T,
  refs: any,
): Promise<T> => {
  try {
    const { _derefSchema } = (await refParser.dereference(
      {
        _derefSchema: schema,
        ...refs,
      },
      { dereference: { circular: 'ignore' } },
    )) as any;

    return generate({ additionalProperties: false, ..._derefSchema });
  } catch (err) {
    sysLog.error(`Error generating schema examples: `, schema);
    throw new Error(`Error generating schema examples: ${err}`);
  }
};
