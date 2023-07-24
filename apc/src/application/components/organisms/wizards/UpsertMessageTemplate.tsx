import React, { FC, useEffect, useState } from 'react';

import { useAtom } from 'jotai';

import ArrowSVG from '$application/assets/icons/arrow-left.svg';
import MessageSVG from '$application/assets/icons/message-square-fill.svg';
import { Wizard } from '$application/components/molecules/modals/Wizard';
import { ISteps } from '$application/components/molecules/modals/Wizard/types';
import {
  useGetMessageTemplates,
  useUpsertMessageTemplate,
} from '$application/lib/generated/apcApi';

import Channels from './UpsertMessageTemplate/Channels';
import GeneralInfo from './UpsertMessageTemplate/GeneralInfo';
import Title from './UpsertMessageTemplate/GeneralInfo/Title';
import { formDataAtom } from './UpsertMessageTemplate/store';
import SuccessStep from './UpsertMessageTemplate/SuccessStep';
import SuccessTitle from './UpsertMessageTemplate/SuccessStep/SuccessTitle';

interface UpsertMessageTemplateProps {
  onClose?: () => void;
  onDone?: () => void;
  messageTemplateId?: string;
}

export const UpsertMessageTemplate: FC<UpsertMessageTemplateProps> = ({
  onClose,
  onDone,
  messageTemplateId,
}) => {
  const [formData, setFormData] = useAtom(formDataAtom);

  const [currentStep, setCurrentStep] = useState(0);

  const { data, isLoading: initialLoading } = useGetMessageTemplates(
    { id: messageTemplateId },
    {
      query: { enabled: !!messageTemplateId },
    },
  );

  useEffect(() => {
    const template = data?.messageTemplates?.[0];
    if (!!messageTemplateId && template) {
      setFormData((a) => {
        a.body = template.body ?? '';
        a.channels = template.channels ?? [];
        a.templateId = template.id ?? '';
      });
    } else {
      setFormData((a) => {
        a.body = '';
        a.channels = [];
        a.templateId = '';
      });
    }
  }, [messageTemplateId, data?.messageTemplates, setFormData]);

  const steps: ISteps[] = [
    {
      title: <Title stepName="1. General Info" />,
      children: <GeneralInfo editMode={!!messageTemplateId} />,
    },
    {
      title: <Title stepName="2. Channels" />,
      children: <Channels />,
      buttons: [
        {
          label: 'back to General Info',
          icon: <ArrowSVG />,
          color: 'Normal',
          onClick: () => setCurrentStep(0),
        },
      ],
    },
    {
      title: <SuccessTitle />,
      children: <SuccessStep />,
    },
  ];

  const upsertMessageTemplate = useUpsertMessageTemplate();

  const handleNext = async () => {
    if (currentStep === steps.length - 2) {
      await upsertMessageTemplate.mutateAsync({
        data: formData,
      });
    }
    setCurrentStep((prevState) => prevState + 1);
  };

  return (
    <Wizard
      open
      initialLoading={initialLoading}
      title={`${messageTemplateId ? 'Edit' : 'Create'} Template`}
      description="This message template will be used by workflow engine to send message to users via multiple channels"
      doneLabel="OK, Got it"
      icon={<MessageSVG />}
      currentStep={currentStep}
      nextLoading={upsertMessageTemplate.isLoading}
      onDone={onDone}
      onNext={handleNext}
      onCancel={onClose}
      steps={steps}
    />
  );
};

export default UpsertMessageTemplate;
