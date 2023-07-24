import { OpenAPIV3 } from 'openapi-types';

import camunda from '../wfEngine/camunda-7-15.openapi.json';

export const getOpenApiComponents = (): OpenAPIV3.ComponentsObject => ({
  schemas: {
    ...camunda.components.schemas,
    // TODO: looks like orval does not support this https://swagger.io/docs/specification/data-models/data-types/#any
    // AnyValue: {
    //   nullable: true,
    //   description: 'Can be any value - string, number, boolean, array or object.',
    //   anyOf: [
    //     { type: 'string' },
    //     { type: 'number' },
    //     { type: 'integer' },
    //     { type: 'boolean' },
    //     { type: 'array', items: { type: 'any' } },
    //     { type: 'object' },
    //   ],
    // },
  } as any,
});
