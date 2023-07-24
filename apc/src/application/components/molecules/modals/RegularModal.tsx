import React, { FC } from 'react';

import { Dialog as MuiDialog } from '@material-ui/core';
import styled, { FlattenSimpleInterpolation } from 'styled-components';

import { RefElement } from '$application/lib/hooks/useEventListener';
import { useScroll } from '$application/lib/hooks/useScroll';

export interface RegularModalProps {
  className?: string;
  open: boolean;
  subTitle?: string;
  mainTitle: string;
  paperStyle?: FlattenSimpleInterpolation;
  actions?: ({ showScrollShadow: boolean }) => React.ReactElement | null;
  onClose?: () => void;
  showHeaderShadow?: boolean;
  scrollElement?: RefElement;
}

export const RegularModal: FC<RegularModalProps> = ({
  className,
  open,
  onClose,
  scrollElement,
  mainTitle,
  subTitle,
  children,
  paperStyle,
  actions,
}) => {
  const { scrolledEnd, scrolledTop, scrolling } = useScroll(scrollElement ?? null);
  const showHeaderShadow = (scrolledEnd || scrolling) && !!scrollElement;
  const showFooterShadow = (scrolledTop || scrolling) && !!scrollElement;

  return (
    <Background isOpen={open} className={className}>
      <StyledDialog open={open} onClose={onClose} maxWidth="lg" $rootStyle={paperStyle}>
        <Div $showShadow={showHeaderShadow}>
          <DialogTitle>{mainTitle}</DialogTitle>
          <DialogSubTitle>{subTitle}</DialogSubTitle>
        </Div>
        <DialogContent>{children}</DialogContent>
        {actions?.({ showScrollShadow: showFooterShadow })}
      </StyledDialog>
    </Background>
  );
};
interface BackgroundProps {
  isOpen: boolean;
}

const Background = styled.div<BackgroundProps>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  background-color: rgba(115, 130, 151, 0.1);
  z-index: 999;
`;

const DialogTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  line-height: 1.2;
`;

const Div = styled.div<{ $showShadow: boolean }>`
  box-shadow: ${({ $showShadow }) =>
    $showShadow && '1px 1px 17px 15px rgb(227 235 247 / 40%)'};
  z-index: 11;
  padding: 36px;
`;

const DialogSubTitle = styled.div`
  margin-top: 6px;
  font-size: 16px;
  line-height: 1.5;
  color: ${({ theme }) => theme.palette.grey['700']};
`;

interface StyledDialogProps {
  $rootStyle?: FlattenSimpleInterpolation;
}

const StyledDialog = styled(MuiDialog)<StyledDialogProps>`
  .MuiPaper-root {
    background-color: ${({ theme }) => theme.background.primary};
    border-radius: 8px;
    box-shadow: 0 0 24px 0 rgba(193, 205, 221, 0.3);
    ${({ $rootStyle }) => $rootStyle}
  }
  .MuiDialog-paperScrollPaper {
    max-height: calc(100% - 100px);
  }
  .MuiBackdrop-root {
    -webkit-backdrop-filter: blur(3px);
    backdrop-filter: blur(3px);
    background-color: rgba(114, 130, 151, 0.1);
  }
  .MuiDialog-paper {
    overflow: auto;
  }
`;

const DialogContent = styled.div`
  padding: 0px 36px 0 36px;
  flex: 1 1 auto;
  height: calc(100% - 212px);
`;

export default RegularModal;
