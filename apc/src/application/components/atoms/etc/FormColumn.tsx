import styled from 'styled-components';

export interface FormColumnProps {
  display?: boolean;
}

const FormColumn = styled.div<FormColumnProps>`
  display: flex;
  flex-direction: row;
  gap: 24px;
`;

export default FormColumn;
