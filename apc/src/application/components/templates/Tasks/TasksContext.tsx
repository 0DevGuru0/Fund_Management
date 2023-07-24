import { createContext } from 'react';

import { atom } from 'jotai';
import { PrimitiveAtom } from 'jotai/core/atom';

import { IFilter } from '$application/components/organisms/tables/Table/Filter/filterTypes';
import {
  GetTasks200,
  GetTasksSummary200Item,
} from '$application/lib/generated/apcApi.schemas';

interface TasksSummary {
  isLoading: boolean;
  summaries: GetTasksSummary200Item[];
}
interface Tasks {
  data: GetTasks200;
  error: any;
  isFetching: boolean;
}

export interface ITasksContext {
  space: string;
  tasks: Tasks;
  tasksSummary: TasksSummary;
  currentPageAtom: PrimitiveAtom<number>;
  filterOptionsAtom: PrimitiveAtom<IFilter>;
  filterCardOpenAtom: PrimitiveAtom<boolean>;
  selectedTasksAtom: PrimitiveAtom<Record<string, boolean>>;
  sortByTaskAtom: PrimitiveAtom<string>;
}

const filterCardOpenAtom = atom(false);

export const initTasksContext: ITasksContext = {
  space: '',
  tasksSummary: { isLoading: true, summaries: [] },
  tasks: {
    data: { count: 0, tasks: [] },
    error: null,
    isFetching: true,
  },
  filterCardOpenAtom,
  currentPageAtom: atom(1),
  filterOptionsAtom: atom({}),
  selectedTasksAtom: atom({}),
  sortByTaskAtom: atom('Task'),
};

export const TasksContext = createContext(initTasksContext);
