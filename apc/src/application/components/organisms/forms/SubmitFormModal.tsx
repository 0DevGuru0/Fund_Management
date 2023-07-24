import React, { FC, useRef, useState } from 'react';

import styled, { css } from 'styled-components';

import RegularModal from '$application/components/molecules/modals/RegularModal';
import { useUserInfo } from '$application/lib/auth/useUserInfo';

import { Form } from './FormModal/Form';
import ModalActions from './FormModal/ModalActions';

export interface SubmitFormModalProps {
  title: string;
  subTitle: string;
  formConfig: any;
  open: boolean;
  onCancel?: (data: { data: any; isValid: boolean }) => void;
  onClear?: (data: { data: any; isValid: boolean }) => void;
  onSubmit?: (data: any) => void;
}

export const SubmitFormModal: FC<SubmitFormModalProps> = ({
  title,
  subTitle,
  formConfig,
  onCancel,
  onClear,
  onSubmit,
  open,
}) => {
  const form = useRef<any>();
  const userInfo = useUserInfo();
  const formWrapperRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<any>(null);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [buttonLoading, setButtonLoading] = useState(false);

  const onFormSubmit = async (_data: any) => {
    onSubmit?.(_data);
    setButtonLoading(true);
  };

  const onSubmitButtonClicked = () => {
    form.current.submit(false).catch((e) => e !== false);
  };

  const onClearButtonClicked = () => {
    onClear?.({ data: formData, isValid });
    form.current.resetValue();
    setButtonLoading(false);
  };

  const cancelHandler = () => {
    onCancel?.({ data: formData, isValid });
    form.current.resetValue();
    setButtonLoading(false);
  };

  const onChange = (change) => {
    setFormData(change.data);
    setIsValid(change.isValid);
  };

  return (
    <CustomizedRegularModal
      open={open}
      onClose={cancelHandler}
      mainTitle={title}
      subTitle={subTitle}
      paperStyle={paperStyle}
      scrollElement={formWrapperRef}
      actions={({ showScrollShadow }) => (
        <ModalActions
          showScrollShadow={showScrollShadow}
          onCancel={cancelHandler}
          buttonLoading={buttonLoading}
          onClear={onClearButtonClicked}
          onSubmit={onSubmitButtonClicked}
        />
      )}
    >
      <ContentWrapper ref={formWrapperRef}>
        <Form
          ref={(instance) => (form.current = instance)}
          formConfig={formConfig}
          onSubmit={onFormSubmit}
          onChange={onChange}
          submission={{
            data: {
              orcid: userInfo?.orcid,
              affiliation: userInfo.affiliation?.label,
            },
          }}
        />
      </ContentWrapper>
    </CustomizedRegularModal>
  );
};

const paperStyle = css`
  padding-bottom: 0;
  min-width: 500px;
  height: 80%;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  overflow-y: scroll;
  & .formio-component.form-group {
    padding-bottom: 36px;
  }
  & .formio-component-content {
    p {
      margin-bottom: 0;
    }
    span {
      font-size: 16px;
      color: ${({ theme }) => theme.palette.grey['600']};
      font-weight: normal !important;
    }
  }
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  overflow-x: hidden;
  height: calc(100% + 36px);
  & .choices[data-type*='select-one'] .choices__button.choices__button {
    top: 11px;
    right: 24px;
  }
  &.was-validated #bootstrap .form-control:invalid,
  #bootstrap .form-control.is-invalid {
    background-image: unset;
  }
  & a[ref='fileLink'] {
    &:hover {
      font-weight: bold;
    }
    cursor: pointer;
    color: ${({ theme }) => theme.palette.primary} !important;
    text-decoration: underline !important;
  }
  .formio-startProcess-selectFund {
    &-titleWrapper {
      display: flex;
    }
    &-title {
      font-size: 16px;
      max-width: 80%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    &-type {
      font-size: 10px;
      vertical-align: top;
      font-weight: bold;
      margin-left: 3px;
    }
    &-description {
      width: 80%;
      margin-left: 10px;
      line-height: 1.33;
      font-size: 12px;
      color: #a1b1c7;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .choices__button {
    top: 50% !important;
    transform: translate(0, -50%) !important;
  }
`;

const CustomizedRegularModal = styled(RegularModal)`
  overflow: hidden;
`;

export default SubmitFormModal;
