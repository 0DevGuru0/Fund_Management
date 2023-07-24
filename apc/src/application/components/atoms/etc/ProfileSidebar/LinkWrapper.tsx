import React, { FC, ReactElement } from 'react';

import Link from 'next/link';
import styled from 'styled-components';

export interface LinkWrapperProps {
  inNewTab: boolean;
  href: string;
  children: ReactElement;
}

export const LinkWrapper: FC<LinkWrapperProps> = (props) => {
  const { href, inNewTab, children } = props;
  if (inNewTab) {
    return (
      <StyledA target="_blank" href={href} rel="noopener noreferrer">
        {children}
      </StyledA>
    );
  } else {
    return <Link href={href}>{children}</Link>;
  }
};

const StyledA = styled.a`
  text-decoration: none;
`;

export default LinkWrapper;
