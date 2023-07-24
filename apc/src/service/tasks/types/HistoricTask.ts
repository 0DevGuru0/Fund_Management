import { HistoricTaskInstanceDto } from '$service/generated/wfCamunda';

export type HistoricTask = HistoricTaskInstanceDto & { type: 'history' };
