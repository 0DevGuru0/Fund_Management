import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { baseDoc } from '$service/openApi/baseDoc';
import { getOpenApiPathsConfig } from '$service/openApi/getOpenApiPathsConfig';

interface Query {
  [key: string]: string | string[];
}

interface Body {
  testProp: boolean;
}

const openapi: ApiHandler<Body, any, Query> = async (req, res) => {
  return {
    openapi: '3.0.0',
    paths: await getOpenApiPathsConfig(),
    ...baseDoc,
  };
};

export default withMiddleware(openapi)({
  operationId: 'getOpenApiSpec',
  description: 'Get OpenAPI spec',
  method: 'GET',
  isPublic: true,
});
