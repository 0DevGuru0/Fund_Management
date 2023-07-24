import React, { FC } from 'react';

import styled from 'styled-components';

import { Button } from '$application/components/atoms/buttons/Button';

import { userStore } from '../store';

export const ImmerAtom: FC = () => {
  const users = userStore((state) => state.users);
  const userUpdater = userStore((state) => state.update);
  const increaseUserCounter = (index) => {
    userUpdater((draft) => {
      draft.users[index].counter++;
    });
  };

  return (
    <Container>
      {users.map((user, index) => (
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
