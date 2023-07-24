import React from 'react';

import { useAtom } from 'jotai';
import styled from 'styled-components';

import { Button } from '$application/components/atoms/buttons/Button';
import FormColumn from '$application/components/atoms/etc/FormColumn';
import FormControl from '$application/components/atoms/etc/FormControl';
import { Select, SelectProps } from '$application/components/molecules/inputs/Select';

import { CreateFormItems } from './Report/CreateFormItems';
import ReportAdvanced from './Report/ReportAdvanced';
import { formDataAtom } from './Report/store';
import { useReport } from './Report/useReport';

const Report = () => {
  const { onViewResult } = useReport();
  const [formData, setFormData] = useAtom(formDataAtom);

  const typeProps: SelectProps<string> = {
    items: ['All', 'Only invoice Request', 'Only Voucher Request'],
    label: 'Request Type',
    onSelect: (item) => {
      setFormData((a) => {
        a.type = item;
      });
    },
    selectedItems: formData.type ? [formData.type] : [],
  };

  return (
    <Container>
      <HeaderText>Filter</HeaderText>
      <SubHeaderText>
        Specify your desired items and finally, receive your report
      </SubHeaderText>
      <FormContainer>
        <FormColumn>
          <FormControl>
            <Select {...typeProps} />
          </FormControl>
          <CreateFormItems filtersMode="regular" />
        </FormColumn>
      </FormContainer>
      <ReportAdvanced />
      <ButtonContainer>
        <Button
          onClick={onViewResult}
          variant="contained"
          color="primary"
          title="View Result"
        />
      </ButtonContainer>
    </Container>
  );
};

export default Report;

const Container = styled.div`
  padding: 36px;
`;

const HeaderText = styled.div`
  font-size: 20px;
  display: block;
  font-weight: bolder;
  color: ${({ theme }) => theme.text.contrast.secondary};
`;

const SubHeaderText = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.palette.grey[800]};
  margin-top: 10px;
`;

const FormContainer = styled.div`
  margin-top: 40px;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  float: right;
`;
