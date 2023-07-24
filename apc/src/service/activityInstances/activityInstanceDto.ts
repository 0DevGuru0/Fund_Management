import { JSONSchemaType } from '$service/validator/ajvTypes';

export interface ActivityInstance {
  id: string;
  type: string;
  name: string;
  description?: string | null;
  startTime: string;
  endTime?: string | null;
  assignee?: string | null;
  taskId?: string | null;
  processInstanceId: string;
  processDefinitionId: string;
}

export const activityInstanceDto: JSONSchemaType<ActivityInstance> = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    type: { type: 'string' },
    name: { type: 'string' },
    description: { nullable: true, type: 'string' }, // TODO: checkout IW-392
    startTime: { type: 'string', format: 'date-time' },
    endTime: { nullable: true, type: 'string', format: 'date-time' },
    assignee: { nullable: true, type: 'string' },
    taskId: { nullable: true, type: 'string', format: 'uuid' },
    processInstanceId: { type: 'string', format: 'uuid' },
    processDefinitionId: { type: 'string' },
  },
  required: [
    'id',
    'type',
    'name',
    'startTime',
    'processInstanceId',
    'processDefinitionId',
  ],
};
