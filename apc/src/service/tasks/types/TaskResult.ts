import { ActiveTask } from './ActiveTask';
import { HistoricTask } from './HistoricTask';

export interface TaskResult {
  tasks: HistoricTask[] | ActiveTask[];
  count: number;
}
