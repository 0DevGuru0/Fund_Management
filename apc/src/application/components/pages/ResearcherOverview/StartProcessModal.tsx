import React, { FC } from 'react';

import { useQueryClient } from 'react-query';
import styled from 'styled-components';

import { LoadingData } from '$application/components/atoms/etc/LoadingData';
import SubmitFormModal from '$application/components/organisms/forms/SubmitFormModal';
import { useUserInfo } from '$application/lib/auth/useUserInfo';
import {
  getGetProcessInstancesQueryKey,
  useGetStartFormConfig,
  useStartProcessInstance,
} from '$application/lib/generated/apcApi';

import { getProcessInstancesParams } from '../ResearcherOverview';

interface Props {
  onCancel: () => void;
}

export const defaultProcess = process.env.NEXT_PUBLIC_FUND_APPLICATION_PROCESS;

export const StartProcessModal: FC<Props> = (props) => {
  const { data: formConfig, error, isLoading } = useGetStartFormConfig<any>(
    defaultProcess,
  );

  const queryClient = useQueryClient();

  const userInfo = useUserInfo();
  const submitMutation = useStartProcessInstance();
  const onSubmit = async (data) => {
    const result = await submitMutation.mutateAsync({
      data: { data: { ...data, affiliation: userInfo.affiliation?.id } },
      processIdentity: defaultProcess,
    });

    queryClient.invalidateQueries(
      getGetProcessInstancesQueryKey(getProcessInstancesParams),
    );

    props.onCancel();
    return result;
  };

  return (
    <LoadingData
      loading={isLoading}
      error={error && { message: error }}
      customLoaderWrapper={(Loader) => (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}
    >
      {() => (
        <SubmitFormModal
          title="Submit Application"
          subTitle="You must first specify the journal you want and then enter the details of your article"
          open
          onSubmit={(data) => {
            const newData = data.data;
            onSubmit(newData);
          }}
          formConfig={formConfig}
          onCancel={props.onCancel}
        />
      )}
    </LoadingData>
  );
};
export default StartProcessModal;

const LoaderWrapper = styled.div`
  position: absolute;
  right: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
