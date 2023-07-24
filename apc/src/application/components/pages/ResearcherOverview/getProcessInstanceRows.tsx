import getSymbolFromCurrency from 'currency-symbol-map';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import { isEmpty, mapValues } from 'lodash';
import numeral from 'numeral';

import { TextType } from '$application/components/organisms/tables/Table/InnerTable/CommonText';
import { GetProcessInstances200Item } from '$application/lib/generated/apcApi.schemas';

import { ProcessInstanceListVariables } from '../ResearcherOverview';

import { TaskRouteWrapper } from './TaskRouteWrapper';

dayjs.extend(minMax);

const dateFormat = 'DD MMM YYYY';

export const getProcessInstanceStatus = (
  process: GetProcessInstances200Item,
  username?: string,
): string => {
  if (process.state === 'COMPLETED') {
    return 'Completed';
  }
  return !isEmpty(process.activeTasks?.filter((task) => task.assignee === username))
    ? 'Pending'
    : 'In Progress';
};

export const getProcessInstanceRows = (
  toggledTasks,
  onToggleTask,
  processInstances: GetProcessInstances200Item[],
  processPolicy: Record<string, string>,
  username?: string,
): any[] =>
  processInstances.map((process, index) => {
    const updatedDate =
      process.state === 'COMPLETED'
        ? dayjs(process.endTime as string)
        : dayjs.max(
            process.activeTasks?.flatMap((task) =>
              task.created ? dayjs(task.created) : [],
            )!,
          );

    const variables =
      (mapValues(
        process.variables,
        ({ value }) => value,
      ) as ProcessInstanceListVariables) ?? {};

    const {
      articleTitle,
      publisher,
      journal,
      publishPrice,
      fundApplicationId,
      currency,
    } = variables;

    return {
      id: process.id,
      article: {
        taskKey: fundApplicationId,
        title: articleTitle,
        width: 449,
        index,
        isChecked: toggledTasks[process.id!],
        onToggle: onToggleTask,
      },
      currentTask: {
        textType: TextType.NormalLight,
        text: process.activeTasks?.map((task) => task.name).join(', ') ?? '-',
      },
      voucher: {
        textType: TextType.NormalLight,
        text: processPolicy[process.id!],
      },
      publisher: {
        textType: TextType.NormalLight,
        text: publisher.title,
      },
      journal: {
        textType: TextType.NormalDark,
        text: journal?.title,
      },
      price: {
        textType: TextType.NormalDark,
        text: `${getSymbolFromCurrency(currency)}${numeral(publishPrice).format('0,0')}`,
      },
      state: {
        label: getProcessInstanceStatus(process, username),
        updateDate: updatedDate ? updatedDate.format(dateFormat) : '',
        // eslint-disable-next-line react/display-name
        routeWrapper: (props: any) => (
          <TaskRouteWrapper {...props} $processId={process.rootProcessInstanceId} />
        ),
      },
    };
  });
