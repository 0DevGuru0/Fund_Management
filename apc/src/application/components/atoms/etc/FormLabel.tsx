import styled from 'styled-components';

export const FormLabel = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text.contrast.secondary};
`;

export default FormLabel;
