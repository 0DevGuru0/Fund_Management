import React from 'react';

import styled from 'styled-components';

interface Props {
  pageLayout: 'Management' | 'Researcher';
  children: React.ReactNode;
}

const Container: React.FC<Props> = ({ pageLayout, children }) => {
  return pageLayout === 'Researcher' ? <Body>{children}</Body> : <div>{children}</div>;
};

export default Container;

const Body = styled.div`
  height: inherit;
  padding: 24px 186px;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.background.secondary};

  .border {
    border-radius: 12px;
  }

  .shadow {
    box-shadow: 0 2px 6px 0 ${({ theme }) => theme.palette.grey['400']};
  }
`;
