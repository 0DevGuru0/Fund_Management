import React, { FC } from 'react';

import styled from 'styled-components';

import { Button } from '$application/components/atoms/buttons/Button';

import { counterStore } from '../store';

export const Sample: FC = () => {
  const [count, setCount] = counterStore((state) => [state.count, state.setCount]);

  return (
    <div>
      <Header>
        <b>Hi</b>
        <br />I am a sample for Zustand Store on APC, <br />
        This is not all Zustand,s feature, You can read more in the link below.
        <br />
        <br />
        <a href="https://github.com/pmndrs/zustand">Zustand Documentation!</a>
      </Header>
      <hr />
      <ChildContainer>
        <Info>
          Click on the below <b>Increment Store</b> button to change the sample state:
        </Info>
        <ButtonContainer>
          <Button
            title={`Clicked ME ${count} times.`}
            onClick={() => setCount(count + 1)}
          />
        </ButtonContainer>
      </ChildContainer>
    </div>
  );
};

const ChildContainer = styled.div`
  padding: 10px;
`;

const Header = styled.div`
  font-size: 1.3rem;
  text-align: center;
  margin: 40px 0;
`;

const Info = styled.div`
  text-align: center;
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin: 20px 0;
`;

export default Sample;
