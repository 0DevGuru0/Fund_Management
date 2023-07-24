/* eslint-disable no-console */
import dayjs from 'dayjs';
import { isEmpty, pick } from 'lodash';

import { SimpleTitle } from '$application/components/organisms/tables/Table/CornerColumn/SimpleTitle';
import TaskOptions, {
  ITaskOptions,
} from '$application/components/organisms/tables/Table/CornerColumn/TaskOptions';
import { IFilter } from '$application/components/organisms/tables/Table/Filter/filterTypes';
import CommonText, {
  TextType,
} from '$application/components/organisms/tables/Table/InnerTable/CommonText';
import { CreatedBy } from '$application/components/organisms/tables/Table/InnerTable/CreatedBy';
import { GetTasks200TasksItem } from '$application/lib/generated/apcApi.schemas';
import { tasksConfig } from '$service/tasks/config';

export const filterTasks = (tasks, _filterOptions: IFilter): any[] => {
  if (isEmpty(_filterOptions)) {
    return tasks;
  }

  let filteredTasks: any[];

  filteredTasks = tasks;
  // .filter(
  //   (task) =>
  //     !_filterOptions.checkboxes ||
  //     _filterOptions.checkboxes.includes(task.state.label),
  // )
  // .filter(
  //   (task) =>
  //     !_filterOptions.process || _filterOptions.process.includes(task.process.text),
  // );

  if (_filterOptions.searchPhrase && _filterOptions.searchPhrase.trim().length > 0) {
    const _searchPhrase = _filterOptions.searchPhrase.trim().toLowerCase();

    filteredTasks = filteredTasks.filter(
      (task) =>
        task.article.title.toLowerCase().includes(_searchPhrase) ||
        task.article.taskKey.toLowerCase().includes(_searchPhrase),
    );
  }

  return filteredTasks;
};

export const tableDefinitions = [
  {
    width: '449px',
    column: 'article',
    label: 'Article',
    renderer: SimpleTitle,
  },
  {
    width: '250px',
    column: 'task',
    label: 'Task',
    renderer: CommonText,
  },
  {
    width: '250px',
    column: 'assignee',
    label: 'Assignee',
    renderer: CreatedBy,
  },
  {
    width: '250px',
    column: 'description',
    label: 'Description',
    renderer: CommonText,
  },
  {
    width: '250px',
    column: 'requestedBy',
    label: 'Requested By',
    renderer: CreatedBy,
  },
  {
    width: '160px',
    column: 'dateCreated',
    label: 'Date Created',
    renderer: CommonText,
  },
  { width: '72px', column: 'more', label: '', renderer: TaskOptions },
];

interface MappedTasksParameters {
  currentPage;
  selectedTasks;
  onToggleTask;
  onCheckAndDo;
  onViewDetails;
  tasksData?: GetTasks200TasksItem[];
  isAdmin?: boolean;
  username?: string;
}

export const getMappedTasks = (parameters: MappedTasksParameters): any[] => {
  const {
    currentPage,
    selectedTasks,
    onToggleTask,
    onCheckAndDo,
    onViewDetails,
    tasksData,
    isAdmin,
    username,
  } = parameters;
  return (tasksData ?? []).map((task, index) => {
    const taskOptions: ITaskOptions[] = [
      {
        filledIcon: 'eye-fill',
        icon: 'eye',
        title: 'View Details',
        clickHandler: (e) => {
          e.stopPropagation();
          onViewDetails(task.processInstanceId);
        },
      },
      // {
      //   title: 'Export',
      //   icon: 'xls-file',
      //   // TODO: replace with filled version.
      //   filledIcon: 'xls-file',
      //   clickHandler: console.log,
      // },
      // {
      //   title: 'Share',
      //   icon: 'share-2',
      //   filledIcon: 'share-2-fill',
      //   clickHandler: console.log,
      // },
    ];

    if (task.assignee === username) {
      taskOptions.push({
        filledIcon: 'check',
        icon: 'check',
        title: 'Check And Do',
        clickHandler: (e) => {
          e.stopPropagation();
          onCheckAndDo(task.id);
        },
      });
    }

    const {
      description,
      articleTitle,
      startedBy,
      fundApplicationId,
    } = task.processVariables as any;

    return {
      ...pick(task, ['id', 'processDefinition']),
      article: {
        id: String(task.id).padStart(4, '0'),
        title: articleTitle.value,
        taskKey: fundApplicationId.value,
        width: 449,
        index: (currentPage - 1) * tasksConfig.inboxPageSize + index,
        isChecked: selectedTasks[task.id!],
        onToggle: onToggleTask,
      },
      task: {
        textType: TextType.SmallDark,
        text: task.name,
      },
      assignee: {
        image: '/defaultUser.png',
        name: task.assignee,
        taskId: task.id,
        isAdmin,
      },
      description: {
        textType: TextType.SmallDark,
        text: description?.value,
      },
      requestedBy: {
        image: '/defaultUser.png',
        name: startedBy.value.name,
      },
      dateCreated: {
        text: task.type === 'active' ? dayjs(task.created!).format('DD MMM YYYY') : '',
      },
      more: { title: 'more', variant: 'vertical', size: 'sm', taskOptions },
    };
  });
};
