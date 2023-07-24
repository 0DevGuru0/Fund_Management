import React from 'react';

import { Textarea } from '@iin/pubnito-components';
import { useAtom } from 'jotai';
import styled from 'styled-components';

import FormControl from '$application/components/atoms/etc/FormControl';
import FormLabel from '$application/components/atoms/etc/FormLabel';
import Input from '$application/components/atoms/etc/Input';
import { hideScrollBar } from '$application/utils';

import { formDataAtom } from './store';

export const GeneralInfo = (props: { editMode: boolean }) => {
  const [formData, setFormData] = useAtom(formDataAtom);
  return (
    <>
      <SubTitle>
        You can interpolate variables inside each field using the handlebars template
        language. Click on the handlebars logo for more information.
      </SubTitle>
      <Container>
        <StyledFormControl>
          <FormLabel>ID</FormLabel>
          <StyledInput
            disabled={props.editMode}
            onChange={(val) => {
              setFormData((a) => {
                a.templateId = val;
              });
            }}
            value={formData.templateId}
          />
        </StyledFormControl>
        <FormControl>
          <FormLabel>Body</FormLabel>
          <StyledTextarea
            onChange={(e) => {
              setFormData((a) => {
                a.body = e.target.value;
              });
            }}
            value={formData.body}
            rowsMin={4}
            fullWidth
            placeholder={
              'Congratulations {{name}} {{family}}\nHere is your voucher code {{voucher}}'
            }
          />
        </FormControl>
      </Container>
    </>
  );
};
const Container = styled.div`
  margin-top: 44px;
`;

const StyledFormControl = styled(FormControl)`
  margin-bottom: 36px;
`;
const SubTitle = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.grey[700]};
`;
const StyledTextarea = styled(Textarea)`
  &:focus {
    box-shadow: 0 0 0 3px rgba(192, 239, 239, 0.4);
  }
  background-color: ${({ theme }) => theme.palette.grey[200]};
  border: ${({ theme }) => theme.palette.grey[200]};
  ${hideScrollBar}
`;
const StyledInput = styled(Input)`
  font-family: inherit;
  &.Mui-focused {
    box-shadow: 0 0 0 3px rgba(192, 239, 239, 0.4);
  }
`;
export default GeneralInfo;
