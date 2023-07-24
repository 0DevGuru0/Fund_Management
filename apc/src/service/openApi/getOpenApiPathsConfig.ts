import { upperFirst } from 'lodash';
import { OpenAPIV3 } from 'openapi-types';

import { RouteOptions } from '../api/RouteOptions';

import { getOpenApiEndpointSpec } from './getOpenApiEndpointSpec';

export const getOpenApiPathsConfig = async (): Promise<OpenAPIV3.Document['paths']> => {
  const ctx = require.context('$pages/api/v1', true, /\.\/(.*)\.ts$/);
  const paths: OpenAPIV3.Document['paths'] = {};

  const allModulePaths = ctx.keys();
  for (const moduleId of allModulePaths) {
    let handlerOptions: RouteOptions<any, any, any> | RouteOptions<any, any, any>[] = ctx(
      moduleId,
    ).default.options;

    let endpointPath = moduleId.match(/\.(\/.*)\.ts$/)![1]!;

    const [, ...pathArray] = endpointPath.split('/');
    const fileName = pathArray.pop(); // remove the path itself

    // the endpoint for `/tasks/index.ts` is `/tasks` according to Next.js logic
    if (fileName === 'index') {
      endpointPath = ['', ...pathArray].join('/');
    }

    // dynamic routes should be like {id} in openApi specs
    endpointPath = endpointPath.replace(/\[(.*?)\]/g, '{$1}');

    // check if this file has sub path
    const hasSubPath = allModulePaths.some(
      (path) => path !== moduleId && path.indexOf(`${endpointPath}`) >= 0,
    );

    if (!Array.isArray(handlerOptions)) {
      handlerOptions = [handlerOptions];
    }

    for (const handlerConfig of handlerOptions) {
      const { operationId, method } = handlerConfig;
      // TODO: add a full ajv based validation of options here

      const moduleInfo = { rootDirName: pathArray[0], moduleId, fileName, hasSubPath };
      let pathEndpointSpec = await getOpenApiEndpointSpec(handlerConfig, moduleInfo);

      paths[endpointPath] = paths[endpointPath] ?? {};
      const methods = Array.isArray(method) ? method : [method];

      methods.forEach((httpMethod) => {
        if (methods.length > 1) {
          pathEndpointSpec = {
            ...pathEndpointSpec,
            operationId: `${operationId}${upperFirst(httpMethod.toLowerCase())}`,
          };
        }

        paths[endpointPath]![httpMethod.toLowerCase()] = pathEndpointSpec;
      });
    }
  }

  return paths;
};
