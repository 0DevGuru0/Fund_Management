import { startCase } from 'lodash';
import { OpenAPIV3 } from 'openapi-types';

import { RouteOptions } from '$api/RouteOptions';

import { baseDoc } from './baseDoc';
import { generateSchemaExample } from './generateSchemaExample';

interface ModuleInfo {
  rootDirName: string;
  moduleId: string;
  fileName?: string;
  hasSubPath: boolean;
}

export const getOpenApiEndpointSpec = async (
  apiHandlerConfig: RouteOptions<any, any, any>,
  moduleInfo: ModuleInfo,
): Promise<OpenAPIV3.OperationObject> => {
  const { rootDirName, moduleId, fileName, hasSubPath } = moduleInfo;
  const {
    operationId,
    description,
    tag,
    body,
    query,
    response,
    isPublic,
    isApiKeyProtected,
  } = apiHandlerConfig;

  const security: any = isApiKeyProtected
    ? { ApiKeyAuth: [] } // Private API Key
    : isPublic
    ? ([] as const) // No Auth
    : { BearerAuth: [] }; // Private Bearer JWT Auth

  const pathEndpointSpec: OpenAPIV3.OperationObject = {
    operationId,
    description,
    tags: [tag ?? startCase(rootDirName ?? (hasSubPath ? fileName : 'General'))],
    security: [security],
  };

  if (body) {
    const example = await generateSchemaExample(body, baseDoc);

    pathEndpointSpec.requestBody = {
      content: {
        'application/json': {
          examples: body.examples,
          schema: { example, ...(body as any) },
        },
      },
    };
  }

  if (response) {
    const example = await generateSchemaExample(response, baseDoc);

    pathEndpointSpec.responses = {
      200: {
        description: response.description ?? description,
        content: {
          'application/json': {
            examples: response.examples,
            schema: { example, ...(response as any) },
          },
        },
      },
    };
  }

  if (query && query.type === 'object') {
    pathEndpointSpec.parameters = [];
    for (const prop in query.properties) {
      if (!Object.prototype.hasOwnProperty.call(query.properties, prop)) {
        continue;
      }

      const { openApiIn, ...schema } = query.properties[prop];

      if (!openApiIn) {
        throw new Error(
          `Please specify openApiIn field for each field of query. check ${moduleId}, "${prop}" property`,
        );
      }
      const example = await generateSchemaExample(schema, baseDoc);

      pathEndpointSpec.parameters.push({
        schema: { example, ...schema },
        name: prop,
        in: openApiIn,
        description: schema.description,
        examples: schema.examples,
      });
    }
  }

  return pathEndpointSpec;
};
