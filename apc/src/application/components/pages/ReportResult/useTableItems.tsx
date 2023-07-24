import { isEmpty } from 'lodash';

import { useGetTasks } from '$application/lib/generated/apcApi';
import {
  GetFundApplications200FundApplicationsItem,
  GetTasks200TasksItem,
} from '$application/lib/generated/apcApi.schemas';
import { useGetTitleByIdsQuery } from '$application/lib/generated/repoGqlTypes';

import { TextType } from '../../organisms/tables/Table/InnerTable/CommonText';

import { ReportItemType } from './config';

export interface ReportResultDataProps {
  applications: GetFundApplications200FundApplicationsItem[];
}

export const useTableItems = ({ applications }: ReportResultDataProps) => {
  const processIds: string[] = applications.map((item) => String(item.processInstanceId));
  const tasksList = useGetTasks(
    {
      processInstanceIds: processIds?.join(','),
      fields: 'processVariables',
    },
    {
      query: { enabled: !isEmpty(processIds) },
    },
  );

  const affiliationsIds = applications.map((item) => String(item.affiliationId));
  const [affiliations] = useGetTitleByIdsQuery({
    variables: {
      ids: affiliationsIds ?? '',
    },
    pause: isEmpty(affiliationsIds),
  });

  const tableItems: ReportItemType[] = applications.map((item, index) => {
    let taskItem: GetTasks200TasksItem | undefined;

    let affiliationTitle: string | undefined;
    if (!tasksList.isLoading) {
      taskItem = tasksList.data?.tasks?.find(
        (task) => task?.processInstanceId === item.processInstanceId,
      );
    }
    if (!affiliations.fetching) {
      affiliationTitle = affiliations.data?.getItems?.find(
        (affiliationItem: any) => affiliationItem.id === item.affiliationId,
      )?.title;
    }

    return {
      article: {
        id: String(item.id ?? ''),
        article: item.articleTitle ?? '',
        index,
      },
      task: {
        text: taskItem?.name ?? '',
        textType: TextType.NormalDark,
      },
      candidate: {
        text: 'sample text', // TODO
        textType: TextType.NormalDark,
      },
      description: {
        text: taskItem?.description ?? '',
        textType: TextType.NormalDark,
      },
      affiliation: {
        text: affiliationTitle ?? '',
        textType: TextType.NormalDark,
      },
      assignee: {
        text: taskItem?.assignee ?? '',
        textType: TextType.NormalDark,
      },
    };
  });

  return {
    tableItems,
  };
};
