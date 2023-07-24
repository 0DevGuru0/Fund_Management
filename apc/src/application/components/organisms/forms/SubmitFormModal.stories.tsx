import React from 'react';

import { rest } from 'msw';

import { LoadingData } from '$application/components/atoms/etc/LoadingData';
import { StoryFC } from '$application/components/StoryFC';
import {
  useGetStartFormConfig,
  useGetTaskFormConfig,
  useStartProcessInstance,
  useSubmitForm,
} from '$application/lib/generated/apcApi';
import { createServerAddress } from '$application/utils/createServerAddress';

import sampleForm from './formConfig.sample.json';
import { SubmitFormModal, SubmitFormModalProps } from './SubmitFormModal';

export default {
  title: 'Organisms / Forms / Task',
  component: SubmitFormModal,
  parameters: { background: { noPadding: true } },
};

export const TaskForm: StoryFC<SubmitFormModalProps> = (args) => {
  const { data: formConfig, error, isLoading } = useGetTaskFormConfig<any>(taskId);

  const mutation = useSubmitForm();
  const onSubmit = (formData: any) => {
    mutation.mutate({ data: formData.data, taskId });
  };

  return (
    <LoadingData loading={isLoading} error={error && { message: error }}>
      {() => <SubmitFormModal {...args} onSubmit={onSubmit} formConfig={formConfig} />}
    </LoadingData>
  );
};

const taskId = 'afdf34324dsf3421';
TaskForm.args = {
  title: 'Update Status',
  subTitle: 'Please enter your article acceptance lette',
  formConfig: {},
  open: true,
};

TaskForm.parameters = {
  msw: [
    rest.get(createServerAddress(`tasks/:taskId/form-config`), (req, res, ctx) =>
      res(ctx.delay(500), ctx.json(sampleForm)),
    ),
    rest.post(createServerAddress(`tasks/:taskId/submit-form`), (req, res, ctx) =>
      res(ctx.delay(500), ctx.json(true)),
    ),
  ],
  zeplinLink:
    'https://app.zeplin.io/project/607d33693ea7778ad9c2fb17/screen/60d2d145b3f1c216ee820337',
};

const processDefinitionId = '2334ew2f2q4314sfd2';
export const StartProcess: StoryFC<SubmitFormModalProps> = (args) => {
  const { data: formConfig, error, isLoading } = useGetStartFormConfig<any>(
    processDefinitionId,
  );

  const submitMutation = useStartProcessInstance();
  const onSubmit = (data) =>
    submitMutation.mutateAsync({ data, processIdentity: processDefinitionId });

  return (
    <LoadingData loading={isLoading} error={error && { message: error }}>
      {() => <SubmitFormModal {...args} onSubmit={onSubmit} formConfig={formConfig} />}
    </LoadingData>
  );
};

StartProcess.args = {
  title: 'Submit Application',
  subTitle:
    'You must first specify the journal you want and then enter the details of your article',
  formConfig: {},
  open: true,
};

StartProcess.parameters = {
  msw: [
    rest.get(
      createServerAddress(`process-definitions/:processIdentity/form-config`),
      (req, res, ctx) => res(ctx.delay(500), ctx.json(sampleForm)),
    ),
    rest.post(
      createServerAddress(`process-definitions/:processIdentity/instantiate`),
      (req, res, ctx) => res(ctx.delay(500), ctx.json(true)),
    ),
  ],
  zeplinLink:
    'https://app.zeplin.io/project/607d33693ea7778ad9c2fb17/screen/60d2d145b3f1c216ee820337',
};
