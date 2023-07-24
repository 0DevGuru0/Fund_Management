import React from 'react';

import { NextPage } from 'next';
import styled from 'styled-components';

import { LoadingData } from '$application/components/atoms/etc/LoadingData';
import ErrorPage from '$application/components/molecules/etc/ErrorPage';
import { useGetMessageTemplates } from '$application/lib/generated/apcApi';

import MessageTemplateBody from './ManagementMessageTemplateDetails/MessageTemplateBody';
import MessageTemplateHeader from './ManagementMessageTemplateDetails/MessageTemplateHeader';
import RouteControl from './ManagementMessageTemplateDetails/RouteControl';

export interface PageProps {
  pageLayout: 'Management' | 'Researcher';
  messageTemplateId: string;
}

const ManagementMessageTemplateDetails: NextPage<PageProps> = ({ messageTemplateId }) => {
  // TODO: [IW-605] createAt and status should be added to the API
  const createdAt = new Date(2021, 8, 20);
  const status = 'Available';

  const { data, error, isFetching } = useGetMessageTemplates({ id: messageTemplateId });

  const messageTemplate = data?.messageTemplates?.[0]!;

  return (
    <LoadingData error={error} loading={isFetching}>
      {() => (
        <Container>
          {data && data?.count! > 0 ? (
            <>
              <RouteControl />
              <MessageTemplateHeader
                status={status}
                title={messageTemplate.id || '-'}
                body={messageTemplate.body || '-'}
              />
              <MessageTemplateBody
                createdAt={createdAt}
                channels={messageTemplate.channels || []}
              />
            </>
          ) : (
            <ErrorPage
              errorCode="500"
              buttonText="Go to Message Templates"
              redirectPath="/management/message-templates"
              description={`Cannot fetch data for "${messageTemplateId}"`}
            />
          )}
        </Container>
      )}
    </LoadingData>
  );
};

export default ManagementMessageTemplateDetails;

const Container = styled.div`
  padding: 24px 36px;
  padding-bottom: 0;
`;
