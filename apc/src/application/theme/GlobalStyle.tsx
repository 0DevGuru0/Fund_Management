import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

import { progressBarStyle } from '$application/lib/hooks/useProgressBar';
import './fonts';

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  ${progressBarStyle}
  body {
    margin: 0;
    padding: 0;
    color: ${({ theme }) => theme.text.primary};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-weight: ${({ theme }) => theme.typography.fontWeight};
    font-size: ${({ theme }) => theme.typography.fontSize};
    font-style: ${({ theme }) => theme.typography.fontStyle};
    font-stretch: normal;
    user-select: none;
    vertical-align: baseline;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-user-select: none;
    -webkit-touch-callout: none;
  }
`;
