import React, { FC, ReactNode } from 'react';

import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';

import ChevronRight from '$application/assets/icons/chevron-right.svg';

import LinkWrapper from './LinkWrapper';

export interface SidebarButtonProps {
  icon: ReactNode;
  iconFilled?: ReactNode;
  label: string;
  description: string;
  href: string;
  hasArrow: boolean;
  inNewTab: boolean;
}

export const Button: FC<SidebarButtonProps> = (props) => {
  const { icon, iconFilled, label, description, href, hasArrow, inNewTab } = props;
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Container>
      <LinkWrapperStyled href={href} inNewTab={inNewTab}>
        <ButtonContainer isActive={isActive}>
          <IconContainer>
            <Icon>{isActive ? iconFilled : icon}</Icon>
          </IconContainer>
          <ContentContainer>
            <Text isActive={isActive}>{label}</Text>
            <Description isActive={isActive}>{description}</Description>
          </ContentContainer>
          {hasArrow && (
            <ArrowContainer>
              <ChevronRight />
            </ArrowContainer>
          )}
        </ButtonContainer>
      </LinkWrapperStyled>
    </Container>
  );
};

interface ButtonProps {
  isActive?: boolean;
}

const LinkWrapperStyled = styled(LinkWrapper)`
  text-decoration: none;
`;

const IconContainer = styled.div<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  padding: 8px;
  opacity: 0.5;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.grey[200]};
`;

const ContentContainer = styled.div<ButtonProps>`
  display: flex;
  line-height: 1.5;
  margin-left: 12px;
  flex-direction: column;
  width: 205px;
  white-space: break-spaces;
`;

const ArrowContainer = styled.div<ButtonProps>`
  display: flex;
  align-self: flex-start;
  margin-top: 15px;
  width: 20px;
  > svg {
    width: inherit;
    height: inherit;
    & path,
    & use {
      fill: ${({ theme }) => theme.text.hightContrast} !important;
    }
  }
`;

const Icon = styled.div<ButtonProps>`
  > svg {
    width: 20px;
    height: 20px;
    & path,
    & use {
      fill: ${({ theme }) => theme.text.hightContrast} !important;
    }
  }
`;

const highlighted = ({ theme }) => css`
  ${Text} {
    font-weight: bold;
  }
  ${Icon} > svg path, use {
    fill: ${theme.palette.primary} !important;
  }
  ${IconContainer} {
    background-color: ${theme.palette.primaryMiddle};
  }
  ${ArrowContainer} > svg path, use {
    fill: ${theme.palette.primary} !important;
  }
`;

const Text = styled.div<ButtonProps>`
  line-height: 35px;
  font-size: 16px;
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
`;

const Description = styled.div<ButtonProps>`
  font-size: 14px;
`;

const Container = styled.div`
  display: flex;
  overflow: hidden;
  white-space: nowrap;
`;

const ButtonContainer = styled.div<ButtonProps>`
  display: flex;
  color: ${({ theme }) => theme.text.contrast.secondary} !important;
  flex-direction: row;
  align-items: flex-start;
  margin: 12px 0;
  cursor: pointer;
  ${({ isActive }) => isActive && highlighted};
  &:hover {
    ${highlighted};
  }
`;

export default Button;
