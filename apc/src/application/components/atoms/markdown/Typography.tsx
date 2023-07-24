import React, { FC } from 'react';

import clsx from 'classnames';
import styled from 'styled-components';

export interface TypographyProps {
  className?: string;
  children: React.ReactNode;
}

const Typography: FC<TypographyProps> = ({ children, className }) => {
  return <Paragraph className={clsx('Paragraph', className)}>{children}</Paragraph>;
};

export default Typography;

const Paragraph = styled.p`
  font-size: 16px;
  line-height: 24px;
  text-align: justify;
  color: ${({ theme }) => theme.text.contrast.secondary};
`;
