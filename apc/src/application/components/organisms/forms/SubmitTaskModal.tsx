import React, { FC } from 'react';

import { useQueryClient } from 'react-query';

import {
  getGetActivityInstancesQueryKey,
  getGetProcessInstanceByIdQueryKey,
  getGetTasksQueryKey,
  useGetTaskFormConfig,
  useSubmitForm,
} from '$application/lib/generated/apcApi';

import SubmitFormModal from './SubmitFormModal';

interface Props {
  title: string;
  subTitle: string;
  taskId: string;
  processInstanceId?: string;
  onCancel: () => void;
}

export const SubmitTaskModal: FC<Props> = (props) => {
  const { data: formConfig, isLoading } = useGetTaskFormConfig<any>(props.taskId);

  const queryClient = useQueryClient();
  const mutation = useSubmitForm();

  const onSubmit = async (formData: any) => {
    let result;
    try {
      result = await mutation.mutateAsync({
        data: { data: formData.data },
        taskId: props.taskId,
      });

      if (props.processInstanceId) {
        await queryClient.refetchQueries(
          getGetActivityInstancesQueryKey(props.processInstanceId),
        );

        await queryClient.refetchQueries(
          getGetProcessInstanceByIdQueryKey(props.processInstanceId),
        );
      }
    } catch (error) {
      console.log('error => ', error);
    }

    queryClient.invalidateQueries(getGetTasksQueryKey());
    props.onCancel();
    return result;
  };

  return isLoading ? null : (
    <SubmitFormModal
      open
      title={props.title}
      formConfig={formConfig}
      onCancel={props.onCancel}
      subTitle={props.subTitle}
      onSubmit={(data) =>
        onSubmit({
          ...data,
        })
      }
    />
  );
};
