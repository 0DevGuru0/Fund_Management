import React, { FC } from 'react';

import { useAtom } from 'jotai';
import styled from 'styled-components';

import { Button } from '$application/components/atoms/buttons/Button';

import { counterAtom } from '../store';

export const Sample: FC = () => {
  const [counter, setCounter] = useAtom(counterAtom);

  return (
    <div>
      <Header>
        <b>Hi</b>
        <br />I am a sample for Jotai Store on Lernito Exam, <br />
        This is not all Jotai,s feature, You can read more in the link below.
        <br />
        <br />
        <a href="https://github.com/pmndrs/jotai">Jotai Documentation!</a>
      </Header>
      <hr />
      <ChildContainer>
        <Info>
          Click on the below <b>Increment Store</b> button to change the sample state:
        </Info>
        <ButtonContainer>
          <Button
            title={`Clicked ME ${counter} times.`}
            onClick={() => setCounter(counter + 1)}
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
