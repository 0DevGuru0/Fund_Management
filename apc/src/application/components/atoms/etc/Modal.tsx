import React, { FC } from 'react';

import styled from 'styled-components';

export interface ModalProps {
  className?: string;
  open?: boolean;
  children?: JSX.Element;
}

export const Modal: FC<ModalProps> = ({ className, open = false, children }) => (
  <Background isOpen={open} className={className}>
    {children}
  </Background>
);

interface BackgroundProps {
  isOpen: boolean;
}

const Background = styled.div<BackgroundProps>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  background-color: rgba(115, 130, 151, 0.1);
  z-index: 9999;
  align-items: center;
  justify-content: center;
`;

export default Modal;
