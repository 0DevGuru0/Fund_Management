import React, { FC } from 'react';

import clsx from 'classnames';
import styled from 'styled-components';

export interface SeparatorProps {
  className?: string;
}

const Separator: FC<SeparatorProps> = ({ className }) => {
  return <HorizontalSplit className={clsx('Hr', className)} />;
};

export default Separator;

const HorizontalSplit = styled.hr`
  border: 0;
  clear: both;
  width: 100%;
  display: block;
  margin: 24px 0;
  border-bottom: 2px dashed ${({ theme }) => theme.palette.grey[300]};
`;
