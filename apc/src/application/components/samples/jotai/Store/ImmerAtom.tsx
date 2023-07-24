import React, { FC } from 'react';

import { useAtom } from 'jotai';
import styled from 'styled-components';

import { Button } from '$application/components/atoms/buttons/Button';

import { usersAtom } from '../store';

export const ImmerAtom: FC = () => {
  const [usersList, setUsersList] = useAtom(usersAtom);
  const increaseUserCounter = (index) => {
    setUsersList((draft) => {
      draft[index].counter++;
    });
  };

  return (
    <Container>
      {usersList.map((user, index) => (
        <UserContainer key={user.name}>
          <div>
            <h3>{user.name}</h3>
          </div>
          <Button
            title={`Increase ${user.name}'s Counter`}
            onClick={() => increaseUserCounter(index)}
          />
          <div>
            {user.name} count is : {user.counter}
          </div>
        </UserContainer>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-evenly;
`;

const UserContainer = styled.div`
  display: block;
  text-align: center;
  > div {
    margin-top: 10px;
  }
`;
export default ImmerAtom;
