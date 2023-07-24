import React from 'react';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { keyBy, max, mapValues } from 'lodash';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import FundSVG from '$application/assets/icons/fund-fill.svg';
import { GeneralInfo as GeneralTab } from '$application/components/molecules/cards/GeneralInfo';
import { ProcessInstanceDetails as ProcessTab } from '$application/components/molecules/cards/ProcessInstanceDetails';
import { RequestCard } from '$application/components/molecules/cards/RequestCard';
import {
  useGetActivityInstances,
  useGetFundApplications,
  useGetProcessInstanceById,
} from '$application/lib/generated/apcApi';
import generateReadableFileSize from '$application/lib/generateReadableFileSize';
import { TaskNameNormalizer } from '$application/lib/taskToColor';
import { getUserRole } from '$application/utils/userRole';

import PageTitle from '../atoms/etc/PageTitle';

import APCFundRequestVariables from './ProcessInstanceDetails/APCFundRequestVariables';
import BackLink from './ProcessInstanceDetails/BackLink';
import Container from './ProcessInstanceDetails/Container';
import { getAdditionalInfo } from './ProcessInstanceDetails/getAdditionalInfo';

dayjs.extend(relativeTime);

enum TabsType {
  DetailsTab = 'Application Information',
  // eslint-disable-next-line @typescript-eslint/no-shadow
  ActivitiesTab = 'Process',
}

export interface PageProps {
  pageLayout: 'Management' | 'Researcher';
  processId?: string;
}

const ProcessInstanceDetails: NextPage<PageProps> = ({ pageLayout, processId }) => {
  const isManager = pageLayout === 'Management';

  const { role } = getUserRole();

  const router = useRouter();

  const [activeTab, setActiveTab] = React.useState(TabsType.ActivitiesTab);
  const handleChangeTab = React.useCallback((item) => {
    setActiveTab(item);
  }, []);

  const { data: processInstance, isLoading } = useGetProcessInstanceById(
    processId,
    {},
    { query: { enabled: !!processId } },
  );

  const { data: activities } = useGetActivityInstances(processInstance?.id ?? '', {
    query: { enabled: !!processInstance },
  });
  const { data: fundApplicationData } = useGetFundApplications({
    processInstanceIds: processInstance?.id!,
    fields: 'policy,voucher',
  });
  const lastUpdateDate = max(
    activities?.map(({ startTime, endTime }) => endTime ?? startTime),
  );

  if (isLoading || !processInstance) {
    return null;
  }

  const fullVariables = keyBy(processInstance.variables, 'name');

  const variables = mapValues(
    fullVariables,
    ({ value }) => value as any,
  ) as APCFundRequestVariables;
  const {
    articleTitle,
    articlePdfFile,
    publisher,
    journal,
    publishPrice,
    subjectCategory,
    mainSubject,
    currency,
  } = variables;

  const attachment = articlePdfFile[0];

  const additionalInfo = getAdditionalInfo(processInstance, variables);

  let isResearcher = false;

  if (role === 'Researcher') {
    isResearcher = true;
  }

  const onBackClick = () => {
    router.back();
  };

  return (
    <Container pageLayout={pageLayout}>
      {!isResearcher ? (
        <BackLink />
      ) : (
        <PageTitle onBack={onBackClick}>Application Details</PageTitle>
      )}
      <RequestCard
        isManagement={isManager}
        tabs={[TabsType.ActivitiesTab, TabsType.DetailsTab]}
        activeTab={activeTab}
        onChangeTab={handleChangeTab}
        icon={
          <FundSVG
            viewBox="0 0 23 23"
            style={
              isManager
                ? { width: '60px', height: '60px' }
                : { width: '48px', height: '48px' }
            }
          />
        }
        request={{
          id: processInstance.id ?? '',
          state: TaskNameNormalizer[processInstance.state ?? 'UNKNOWN'],
          updateDate: lastUpdateDate ? dayjs(lastUpdateDate).format('DD MMM YYYY') : '',
          process: processInstance.processDefinitionName ?? '',
          title: articleTitle,
        }}
        notificationCount={
          activities?.filter((activity) => activity.endTime === null).length
        }
      />
      <br />
      {activeTab === TabsType.DetailsTab ? (
        <GeneralTab
          attachment={
            attachment
              ? {
                  name: attachment.name,
                  path: attachment.url,
                  type: attachment.type,
                  volume: generateReadableFileSize(attachment.size),
                  createdDate: fullVariables.articlePdfFile?.createTime
                    ? dayjs(fullVariables.articlePdfFile.createTime).fromNow?.()
                    : '',
                }
              : undefined
          }
          description={variables.description}
          additionalInfo={additionalInfo}
        />
      ) : (
        <ProcessTab
          isManagement={isManager}
          processDefinitionId={processInstance.processDefinitionId!}
          processInstanceId={processInstance.id!}
          policyTitle={fundApplicationData?.fundApplications?.[0]?.policy?.title}
          voucherCode={fundApplicationData?.fundApplications?.[0]?.voucher?.code}
          summary={{
            publisher: publisher?.title,
            journal: journal?.title,
            price: publishPrice,
            subjectCategory: subjectCategory?.title,
            mainSubject: mainSubject?.title,
            currency,
          }}
          steps={activities?.map((activity) => {
            // The activities with no name has an id like this Event_a3v23 we'll remove the hash at the end
            const name = activity.name || activity.id.replace(/^(.*)(_.*?)$/, '$1');
            return {
              id: activity.id,
              type: activity.type,
              taskId: activity.taskId,
              name,
              title: name,
              description: activity.description,
              isDone: !!activity.endTime,
              descriptionDate: activity.endTime ?? undefined,
              assignee: activity.assignee,
            };
          })}
        />
      )}
    </Container>
  );
};
export default ProcessInstanceDetails;
