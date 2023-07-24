import { sortBy } from 'lodash';

import { getCamundaPlatformRESTAPI } from '$service/generated/wfCamunda';
import { MutatorOptions } from '$service/wfEngine/orvalGotMutator';

import { ActivityInstance } from './activityInstanceDto';

const { queryHistoricActivityInstances } = getCamundaPlatformRESTAPI();

export const queryActivityInstances = async (
  processInstanceId: string,
  req: MutatorOptions,
): Promise<ActivityInstance[]> => {
  const activities = await queryHistoricActivityInstances({ processInstanceId }, {}, req);

  // Active user tasks are also in the activity history
  return sortBy(
    activities.map((activity) => ({
      id: activity.activityId!,
      type: activity.activityType!,
      name: activity.activityName!,
      startTime: activity.startTime!,
      endTime: activity.endTime,
      assignee: activity.assignee,
      taskId: activity.taskId,
      processInstanceId: activity.processInstanceId!,
      processDefinitionId: activity.processDefinitionId!,
    })),
    ({ startTime }) => new Date(startTime),
  ).reverse();
};
