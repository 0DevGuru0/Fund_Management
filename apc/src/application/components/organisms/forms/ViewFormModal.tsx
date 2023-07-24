import React, { FC, useRef } from 'react';

import { Dictionary } from 'lodash';
import styled, { css } from 'styled-components';

import RegularModal from '$application/components/molecules/modals/RegularModal';
import { useGetTitleByIdsQuery } from '$application/lib/generated/repoGqlTypes';

import { Form } from './FormModal/Form';

export type FormType = 'userTask' | 'startEvent';

export interface ViewFormModalProps {
  openFormDialog?: FormType | null;
  name: string;
  onClose: () => void;
  type: string;
  startFormConfig: unknown;
  taskFormConfig: unknown;
  allProcessInstanceVariables: Dictionary<any>;
}

export const ViewFormModal: FC<ViewFormModalProps> = ({
  openFormDialog,
  name,
  onClose,
  type,
  startFormConfig,
  taskFormConfig,
  allProcessInstanceVariables,
}) => {
  const form = useRef<any>();
  const formWrapperRef = useRef<HTMLDivElement>(null);

  const [{ data: affiliations }] = useGetTitleByIdsQuery({
    variables: {
      ids: allProcessInstanceVariables.affiliation ?? '',
    },
  });
  const affiliation = affiliations?.getItems[0];

  return (
    <CustomizedRegularModal
      mainTitle={name}
      open={!!openFormDialog}
      onClose={onClose}
      paperStyle={paperStyle}
      scrollElement={formWrapperRef}
    >
      <ContentWrapper ref={formWrapperRef}>
        <Form
          onChange={(data) => /* we dont want this */ 'ok'}
          onSubmit={(data) => /* we dont want this */ 'ok'}
          formConfig={type === 'startEvent' ? startFormConfig : taskFormConfig}
          submission={{
            data: {
              ...allProcessInstanceVariables,
              affiliation: affiliation?.title,
            },
          }}
          options={{ readOnly: true }}
          ref={(instance) => (form.current = instance)}
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
  overflow: auto;
`;

export default ViewFormModal;
