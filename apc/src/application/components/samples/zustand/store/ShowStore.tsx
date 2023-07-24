import React, { FC } from 'react';

import styled from 'styled-components';

import { counterStore } from '../store';

export const ShowStore: FC = (props) => {
  const clickedNumber = counterStore((state) => state.count);
  return (
    <Container>
      You clicked on the Increment Store Button {clickedNumber} times.
    </Container>
  );
};

const Container = styled.div`
  font-size: 1.2rem;
`;
export default ShowStore;
