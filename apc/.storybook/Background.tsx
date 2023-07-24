import React, { FC } from 'react';
import styled from 'styled-components';

export const Background: FC<any> = (props) => {

  return <Container noPadding={props.noPadding}>{props.children}</Container>;
};

const Container = styled.div<{ noPadding: boolean }>`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
  padding: ${({ noPadding }) => (noPadding ? 'none' : '1rem')};
  background-color: ${({ theme }) => theme.background.primary};
`;

export default Background;
