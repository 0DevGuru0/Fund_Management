import { css } from 'styled-components';

export const header = css`
  font-weight: ${({ theme }) => theme.typography.fontWeight};
  font-size: 16px;
  line-height: 52px;
  color: ${({ theme }) => theme.text.primary};
`;
