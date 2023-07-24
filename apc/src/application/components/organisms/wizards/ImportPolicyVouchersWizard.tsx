import React, { FC, useEffect, useState } from 'react';

import { useAtom } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';

import ArrowSVG from '$application/assets/icons/arrow-left.svg';
import TicketSVG from '$application/assets/icons/ticket.svg';
import { Wizard } from '$application/components/molecules/modals/Wizard';
import { useAddVouchersToPolicy } from '$application/lib/generated/apcApi';
import { GetPolicies200PoliciesItem } from '$application/lib/generated/apcApi.schemas';

import PolicyStep from './ImportPolicyVouchersWizard/PolicyStep';
import PreviewStep from './ImportPolicyVouchersWizard/PreviewStep';
import { formDataAtom, errorAtom } from './ImportPolicyVouchersWizard/store';
import SuccessStep from './ImportPolicyVouchersWizard/SuccessStep';

export interface ImportPolicyVouchersWizardProps {
  open: boolean;
  onClose?: () => void;
  onDone?: () => void;
  policy?: GetPolicies200PoliciesItem;
}

export const ImportPolicyVouchersWizard: FC<ImportPolicyVouchersWizardProps> = ({
  policy,
  open,
  onClose,
  onDone,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const addVouchersToPolicy = useAddVouchersToPolicy();
  const [formData, setFormData] = useAtom(formDataAtom);
  const setError = useUpdateAtom(errorAtom);

  useEffect(() => {
    if (policy) {
      setFormData((a) => {
        a.policy = {
          id: policy.id,
          label: policy.title,
        };
      });
    }
  }, [policy, setFormData]);

  const handleCancel = () => {
    onClose?.();
    setFormData((a) => {
      a.vouchers = [];
    });
    setCurrentStep(0);
    setError('');
  };

  return (
    <Wizard
      open={open}
      title="Import Vouchers"
      description="Import a list of vouchers for selected policy."
      doneLabel="OK, Got it"
      icon={<TicketSVG />}
      currentStep={currentStep}
      nextLoading={addVouchersToPolicy.isLoading}
      nextDisabled={currentStep === 1 && (!formData.policy || !formData.vouchers)}
      onDone={() => {
        onDone?.();
        handleCancel();
      }}
      onNext={() => {
        if (currentStep === 1) {
          addVouchersToPolicy.mutate(
            {
              policyId: formData.policy?.id,
              data: {
                vouchers: formData.vouchers,
              },
            },
            {
              onSuccess: () => {
                setCurrentStep(2);
              },
              onError: () => {
                setError(
                  'Error: Some of the voucher codes are already imported for this publisher.',
                );
              },
            },
          );
        } else if (currentStep === 0) {
          setCurrentStep(1);
        }
      }}
      onCancel={handleCancel}
      steps={[
        {
          title: '1. Policy',
          children: <PolicyStep />,
        },
        {
          title: '2. Preview',
          children: <PreviewStep />,
          buttons: [
            {
              label: 'Back to Policy',
              icon: <ArrowSVG />,
              onClick: () => {
                setCurrentStep(0);
              },
            },
          ],
        },
        {
          title: '3. Success',
          children: <SuccessStep />,
        },
      ]}
    />
  );
};
