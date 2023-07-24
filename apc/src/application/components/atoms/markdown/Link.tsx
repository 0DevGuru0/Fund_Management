import React, { FC } from 'react';

import clsx from 'classnames';
import styled from 'styled-components';

export interface LinkProps {
  href: string;
  className?: string;
  isExternal?: boolean;
  children: React.ReactNode;
}

const Link: FC<LinkProps> = ({ href, children, className, isExternal = false }) => {
  return (
    <TextLink
      href={href}
      className={clsx('Link', className)}
      target={isExternal ? '_blank' : '_self'}
    >
      {children}
    </TextLink>
  );
};

export default Link;

const TextLink = styled.a`
  margin: 0 6px;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.link.hover};
  &:hover {
    color: ${({ theme }) => theme.text.primary};
  }
`;
