import React, { FC, ReactNode, useState } from 'react';

import clsx from 'classnames';
import dayjs from 'dayjs';
import styled, { css } from 'styled-components';

import { FooterIconLink } from './Footer/FooterIconLink';
import { footerVariations, IContext } from './Footer/FooterVariations';

const currentYear = dayjs().year();
const copyRightCoverage = currentYear === 2021 ? '2021' : `2021-${currentYear}`;

interface FooterProps {
  footerConfig: FooterConfig;
  narrowPadding: boolean;
  context?: IContext;
  className?: string;
}

export interface ClickableItem {
  label: string;
  href: string;
  icon?: {
    default: ReactNode;
    hover?: ReactNode;
  };
}

export interface FooterConfig {
  copyRightLink: string;
  textLinks: ClickableItem[];
  iconLinks: ClickableItem[];
}

export const Footer: FC<FooterProps> = ({
  narrowPadding,
  footerConfig,
  className,
  context = 'Admin',
}) => {
  const [copyRightHovered, setCopyrightHovered] = useState(false);

  const logo = footerVariations[context];

  const mouseEnterHandler = () => setCopyrightHovered(true);

  const mouseOutHandler = () => setCopyrightHovered(false);

  const prefixLogo = () => {
    return logo?.fullName === '' ? logo.fullName : `(${logo?.fullName})`;
  };

  return (
    <MainContainer className={clsx('footer', className)}>
      <Div narrowPadding={narrowPadding}>
        <CopyRightLink href={footerConfig.copyRightLink} target="_blank">
          <>
            <LogoWrapper isHovered={copyRightHovered}>{logo?.logo}</LogoWrapper>
            <CopyRightText onMouseEnter={mouseEnterHandler} onMouseOut={mouseOutHandler}>
              {prefixLogo()} Powered by iKNiTO | © {copyRightCoverage} Notion Wave Inc.
            </CopyRightText>
          </>
        </CopyRightLink>
        <LinkContainer>
          {footerConfig.textLinks.map((link, key) => {
            return (
              <ItemLink href={link.href} target="_blank" key={key}>
                {link.label}
              </ItemLink>
            );
          })}
          {footerConfig.iconLinks.map((link, key) => {
            return <FooterIconLink key={key} {...link} />;
          })}
        </LinkContainer>
      </Div>
    </MainContainer>
  );
};

interface DivProps {
  narrowPadding: boolean;
}

const Div = styled.div<DivProps>`
  width: 1548px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: ${({ narrowPadding }) => (narrowPadding ? '0 36px' : '0px 36px')};
`;

const MainContainer = styled.div`
  background-color: ${({ theme }) => theme.background.primary};
  font-size: 16px;
  height: 68px;
  z-index: 1000;
`;

const CopyRightLink = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
`;

interface LogoWrapperInterface {
  isHovered: boolean;
}

const LogoWrapper = styled.div<LogoWrapperInterface>`
  cursor: pointer;
  margin: 22px 12px 22px 0;
  & > svg {
    width: auto;
    height: 24px;
    path,
    use {
      fill: ${({ theme, isHovered }) =>
        isHovered ? theme.link.text : theme.text.lowContrast};
    }
  }
  &:hover {
    path,
    use {
      fill: ${({ theme }) => theme.link.text};
    }
  }
`;

const CopyRightText = styled.span`
  line-height: 20px;
  color: ${({ theme }) => theme.text.lowContrast};
  cursor: pointer;
  ${LogoWrapper}:hover + &, &:hover {
    color: ${({ theme }) => theme.link.text};
  }
`;

const LinkContainer = styled.div`
  color: ${({ theme }) => theme.text.lowContrast};
  display: inline-flex;
  flex-grow: inherit;
  line-height: 20px;
`;

const hovered = ({ theme }) => css`
  color: ${theme.link.hover};
  text-decoration: underline;
  ${Icon} > svg path, use {
    fill: ${theme.text.contrast.secondary} !important;
  }
`;

const ItemLink = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text.lowContrast};
  margin: auto 36px auto 0;
  &:hover {
    ${hovered};
  }
`;

const Icon = styled.div`
  cursor: pointer;
  margin: auto 0 auto 12px;
  > svg {
    width: 20px;
    height: 20px;
    & path,
    & use {
      fill: ${({ theme }) => theme.text.lowContrast};
    }
  }
  &:hover {
    ${hovered};
  }
`;
