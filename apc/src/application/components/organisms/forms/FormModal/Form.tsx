/* eslint-disable react/display-name */
import React, { FC, RefAttributes } from 'react';

import { filter } from 'lodash';
import dynamic from 'next/dynamic';

import { FormIOWrapperProps, Option } from './Form/FormIOWrapper';

const FormIOWrapper = dynamic<FormIOWrapperProps>(
  () => import('./Form/FormIOWrapper').then((cmp) => cmp.FormIOWrapper),
  {
    ssr: false,
  },
);

export type FormProps = {
  formConfig: any;
  submission?: Record<string, any>;
  options?: Option;
  onSubmit: (data: any) => void;
  onChange: (data: any) => void;
} & RefAttributes<any>;

const setYearRestriction = (dayComponent: any) => {
  const currentYear = new Date().getFullYear();
  dayComponent.defaultValue = `00/00/${currentYear}`;
  dayComponent.maxYear = currentYear;
  dayComponent.minYear = currentYear - 1;
  dayComponent.fields.year.maxYear = currentYear;
  dayComponent.fields.year.minYear = currentYear - 1;
};

export const Form: FC<FormProps> = React.forwardRef(
  ({ onSubmit, formConfig, onChange, options, submission }, _ref) => {
    // set year restriction for both
    // UploadAcceptance and
    // UploadJournalInvoice
    if (formConfig) {
      const invoiceFormComponentItem = filter(formConfig.components, { id: 'emubkuw' });
      if (invoiceFormComponentItem.length > 0) {
        const dayComponent = invoiceFormComponentItem[0].columns[0].components[1];
        setYearRestriction(dayComponent);
      }
      const journalFormComponentItem = filter(formConfig.components, { id: 'efrq7di' });
      if (journalFormComponentItem.length > 0) {
        const dayComponent = journalFormComponentItem[0].columns[1].components[0];
        setYearRestriction(dayComponent);
      }
    }

    return (
      <FormIOWrapper
        options={options}
        formInstanceRef={_ref}
        onChange={onChange}
        submission={submission}
        formConfig={formConfig}
        onSubmit={onSubmit}
      />
    );
  },
);
