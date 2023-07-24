import {
  HistoricProcessInstanceDto,
  TaskDto,
  VariableValueDto,
} from '$service/generated/wfCamunda';
import { getResponseSchema } from '$service/openApi/api/getPathResponseType';
import { JSONSchemaType } from '$service/validator/ajvTypes';
import camundaOpenApiSpec from '$service/wfEngine/camunda-7-15.openapi.json';

export type ProcessInstance = HistoricProcessInstanceDto & {
  variables?: { [key: string]: VariableValueDto };
  activeTasks?: TaskDto[];
};

export const processInstanceDto: JSONSchemaType<ProcessInstance> = {
  type: 'object',
  allOf: [
    {
      ...getResponseSchema(camundaOpenApiSpec, '/history/process-instance/{id}'),
    },
    {
      properties: {
        variables: {
          ...getResponseSchema(camundaOpenApiSpec, '/task/{id}/variables'),
        },
        activeTasks: {
          ...getResponseSchema(camundaOpenApiSpec, '/task'),
        },
      },
    },
  ],
  required: ['activeTasks'],
} as any;
