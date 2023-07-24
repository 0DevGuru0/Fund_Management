import camundaApiSpec from '$service/wfEngine/camunda-7-15.openapi.json';

type CamundaSpec = typeof camundaApiSpec;
type CamundaSpecPaths = keyof CamundaSpec['paths'];

export const getResponseSchema = <T extends CamundaSpecPaths>(
  spec: CamundaSpec,
  path: T,
  method: string = 'get',
): any => {
  return (spec.paths[path] as any)[method.toLowerCase()].responses['200'].content[
    'application/json'
  ].schema;
};
