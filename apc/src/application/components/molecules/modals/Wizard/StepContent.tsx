import styled, { css } from 'styled-components';

import { hideScrollBar } from '$utils';

const StepContent = styled.div<{ $last?: boolean }>`
  ${hideScrollBar};
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 48px;
  padding-top: 72px;
  overflow-y: scroll;
  scroll-behavior: smooth;
  background-color: ${({ theme }) => theme.background.primary};
  background: /* Shadow covers */ linear-gradient(white 30%, rgba(255, 255, 255, 0)),
    linear-gradient(rgba(255, 255, 255, 0), white 70%) 0 100%,
    /* Shadows */
      radial-gradient(farthest-side at 50% 0, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)),
    radial-gradient(farthest-side at 50% 100%, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)) 0
      100%;
  background-repeat: no-repeat;
  background-color: white;
  background-size: 100% 24px, 100% 24px, 100% 12px, 100% 12px;
  /* Opera doesn't support this in the shorthand */
  background-attachment: local, local, scroll, scroll;
  ${({ $last }) =>
    $last &&
    css`
      justify-content: center;
    `}
`;

export default StepContent;
