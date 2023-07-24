import React, { FC } from 'react';

import { useAtomValue } from 'jotai/utils';
import styled from 'styled-components';

import { counterAtom } from '../store';

export const ShowStore: FC = (props) => {
  const clickedNumber = useAtomValue(counterAtom);
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
