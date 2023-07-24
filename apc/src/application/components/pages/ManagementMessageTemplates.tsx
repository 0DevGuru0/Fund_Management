/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';

import { useAtom } from 'jotai';
import { useAtomValue, useResetAtom } from 'jotai/utils';
import { isEmpty, isUndefined } from 'lodash';
import { GetStaticProps, NextPage } from 'next';
import { useQueryClient } from 'react-query';
import styled from 'styled-components';

import { LoadingData } from '$application/components/atoms/etc/LoadingData';
import { GaugeChart } from '$application/components/molecules/charts/GaugeChart';
import {
  defaultGaugeChartData,
  GaugeChartData,
} from '$application/components/molecules/charts/GaugeChart/dataProcess';
import {
  useGetMessageTemplates,
  deleteMessageTemplate,
} from '$application/lib/generated/apcApi';

import DeleteModal from '../molecules/etc/DeleteModal';
import UpsertMessageTemplate from '../organisms/wizards/UpsertMessageTemplate';

import { processMessageTemplateChartData } from './ManagementMessageTemplates/chartDataProcess';
import MessageTemplateControl from './ManagementMessageTemplates/MessageTemplateControl';
import MessageTemplatesTable from './ManagementMessageTemplates/MessageTemplatesTable';
import { messageTemplateApiToTableItem } from './ManagementMessageTemplates/MessageTemplatesTable/messageTemplateApiToTableItem';
import TableControl from './ManagementMessageTemplates/MessageTemplatesTable/TableControl';
import NoMessageTemplates from './ManagementMessageTemplates/NoMessageTemplates';
import {
  currentPageAtom,
  filterOptionsAtom,
  messageTemplateWizard,
} from './ManagementMessageTemplates/store';

export const getStaticProps: GetStaticProps = async () => ({
  props: { pageLayout: 'Management' },
});

const limit = 10;

const MessageTemplates: NextPage = () => {
  const queryClient = useQueryClient();
  const currentPage = useAtomValue(currentPageAtom);
  const filterOptions = useAtomValue(filterOptionsAtom);
  const resetCurrentPage = useResetAtom(currentPageAtom);
  const resetFilterOptions = useResetAtom(filterOptionsAtom);
  const [wizardStatus, setWizardStatus] = useAtom(messageTemplateWizard);

  const { data, error, isLoading, queryKey } = useGetMessageTemplates({
    limit: limit.toString(),
    skip: ((currentPage - 1) * limit).toString(),
    ...(filterOptions.searchPhrase
      ? {
          search: filterOptions.searchPhrase,
        }
      : {}),
  });

  useEffect(() => {
    resetCurrentPage();
  }, [filterOptions]);

  useEffect(() => {
    resetFilterOptions();
  }, []);

  const count = data?.count ?? 0;
  const messageTemplates = data?.messageTemplates ?? [];

  // TODO: Currently we do not handle Available/Suspended
  const resultsCount = [
    { label: 'Available', count },
    { label: 'Suspended', count: 0 },
  ];

  const gaugeChartData: GaugeChartData = count
    ? processMessageTemplateChartData(count, resultsCount)
    : defaultGaugeChartData;

  const noDataExist =
    !isLoading &&
    isEmpty(data?.messageTemplates) &&
    isUndefined(filterOptions.searchPhrase);

  const closeWizard = () =>
    setWizardStatus({ openWizard: false, openDeleteModal: false, messageId: '' });

  const renderMessageId = (id: string | undefined): string => {
    if (!id) {
      return '';
    }
    if (id.length <= 40) {
      return id;
    } else {
      return `${id.substr(0, 40)}...`;
    }
  };

  return (
    <>
      {noDataExist ? (
        <NoMessageTemplates />
      ) : (
        <Container>
          <UpperContainer>
            <ChartContainer>
              <GaugeChart items={gaugeChartData} />
            </ChartContainer>
            <MessageTemplateControl
              onCreateTemplate={() =>
                setWizardStatus({
                  openWizard: true,
                  openDeleteModal: false,
                  messageId: '',
                })
              }
            />
          </UpperContainer>
          <TableControl />
          <LoadingData error={error} loading={isLoading}>
            {() => (
              <MessageTemplatesTable
                pageSize={limit}
                hasError={!!error}
                totalCount={count}
                isLoading={isLoading}
                tableItems={messageTemplateApiToTableItem(messageTemplates)}
              />
            )}
          </LoadingData>
        </Container>
      )}
      {wizardStatus.openWizard && (
        <UpsertMessageTemplate
          messageTemplateId={wizardStatus.messageId}
          onDone={() => {
            queryClient.refetchQueries(queryKey);
            closeWizard();
          }}
          onClose={closeWizard}
        />
      )}

      <DeleteModal
        open={wizardStatus.openDeleteModal}
        title="Warning"
        description={`Are you sure you want to remove "${renderMessageId(
          wizardStatus.messageId,
        )}" Message Template?`}
        onCancel={() => {
          closeWizard();
        }}
        onConfirm={() => {
          deleteMessageTemplate(String(wizardStatus.messageId));
          queryClient.refetchQueries(queryKey);
          closeWizard();
        }}
      />
    </>
  );
};

export default MessageTemplates;

const Container = styled.div`
  padding: 48px 36px;
  padding-bottom: 0;
  flex: 1;
`;

const UpperContainer = styled.div`
  display: flex;
  margin-bottom: 36px;
`;

const ChartContainer = styled.div`
  flex: 1;
`;
