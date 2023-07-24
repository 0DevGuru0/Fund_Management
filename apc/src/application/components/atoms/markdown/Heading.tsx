import React, { FC } from 'react';

import clsx from 'classnames';
import { Element } from 'react-scroll';
import styled from 'styled-components';

export interface HeadingProps {
  className?: string;
  children: React.ReactNode;
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const Heading: FC<HeadingProps> = ({ variant, children, className }) => {
  let innerComponent: JSX.Element;
  const normalizedName: string = children
    ? children.toString().toLowerCase().replace(' ', '-')
    : '';

  switch (variant) {
    case 'h1':
      innerComponent = <H1 className={clsx('H1', className)}>{children}</H1>;
      break;
    case 'h2':
      innerComponent = <H2 className={clsx('H2', className)}>{children}</H2>;
      break;
    case 'h3':
      innerComponent = <H3 className={clsx('H3', className)}>{children}</H3>;
      break;
    case 'h4':
      innerComponent = <H4 className={clsx('H4', className)}>{children}</H4>;
      break;
    case 'h5':
      innerComponent = <H5 className={clsx('H5', className)}>{children}</H5>;
      break;
    default:
      innerComponent = <H6 className={clsx('H6', className)}>{children}</H6>;
      break;
  }

  return <Element name={normalizedName}>{innerComponent}</Element>;
};

export default Heading;

const commonStyles = `
  color: #000;
`;

const H1 = styled.h1`
  ${commonStyles};
`;

const H2 = styled.h2`
  ${commonStyles};
`;

const H3 = styled.h3`
  ${commonStyles};
`;

const H4 = styled.h4`
  ${commonStyles};
`;

const H5 = styled.h5`
  ${commonStyles};
`;

const H6 = styled.h6`
  ${commonStyles};
`;
