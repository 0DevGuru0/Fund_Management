import React, { FC, useState } from 'react';

import { useAtom } from 'jotai';

import ShieldSVG from '$application/assets/icons/shield.svg';
import { Wizard } from '$application/components/molecules/modals/Wizard';
import { useAddPolicy } from '$application/lib/generated/apcApi';

import DetailStep from './CreatePolicyWizard/DetailStep';
import { formDataAtom, formDataInitial } from './CreatePolicyWizard/store';
import SuccessStep from './CreatePolicyWizard/SuccessStep';

export interface CreatePolicyWizardProps {
  open: boolean;
  onClose?: () => void;
  onDone?: () => void;
}

export const CreatePolicyWizard: FC<CreatePolicyWizardProps> = ({
  open,
  onClose,
  onDone,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const addPolicy = useAddPolicy();
  const [formData, setFormData] = useAtom(formDataAtom);
  const handleCancel = () => {
    onClose?.();
    setFormData((a) => Object.assign(a, formDataInitial));
    setCurrentStep(0);
  };

  const handleNext = () => {
    if (currentStep === 0) {
      addPolicy.mutate(
        {
          data: {
            title: formData.title,
            terms: formData.terms,
            type: formData.type,
            note: '',
            publisherId: formData.publisher?.id,
            fundId: formData.funder?.id ?? '',
            journalGroupIds: formData.journals.map((journal) => journal.id),
          },
        },
        {
          onSuccess: () => {
            setCurrentStep(1);
          },
        },
      );
    }
  };

  const handleDone = () => {
    onDone?.();
    handleCancel();
  };

  const nextDisabled =
    !formData.title || !formData.terms || !formData.funder || !formData.journals;

  return (
    <Wizard
      open={open}
      title="Submit Policy"
      description="To create a policy, you must first define its policy and then attach the vouchers you want."
      doneLabel="OK, Got it"
      icon={<ShieldSVG />}
      currentStep={currentStep}
      nextLoading={addPolicy.isLoading}
      nextDisabled={nextDisabled}
      onDone={handleDone}
      onNext={handleNext}
      onCancel={handleCancel}
      steps={steps}
    />
  );
};

const steps = [
  {
    title: '1. Policy Detail',
    children: <DetailStep />,
  },
  {
    title: '2. Success',
    children: <SuccessStep />,
  },
];
