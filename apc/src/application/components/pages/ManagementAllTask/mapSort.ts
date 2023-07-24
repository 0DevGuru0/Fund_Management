import { GetTasksSortBy } from '$application/lib/generated/apcApi.schemas';

export const getSortBy = (sort: string): GetTasksSortBy => {
  switch (sort) {
    case 'Task':
      return 'name';
    case 'Assignee':
      return 'assignee';
    case 'Due Date':
      return 'dueDate';
    default:
      return 'name';
  }
};
