import { TaskDto } from '$service/generated/wfCamunda';

export type ActiveTask = TaskDto & { type: 'active' };
