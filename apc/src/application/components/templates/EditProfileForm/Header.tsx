import React from 'react';

import { useAtomValue } from 'jotai/utils';
import styled from 'styled-components';

import { Button } from '$application/components/atoms/buttons/Button';
import { isAllValuesInObjNotEmpty } from '$application/lib/isAllValuesInObjNotEmpty';

import { profileDataAtom } from './store';

interface HeaderProps {
  onSave: () => void;
  onCancel: () => void;
  role: string;
}
export const Header = ({ onSave, onCancel, role }: HeaderProps) => {
  const profileData = useAtomValue(profileDataAtom);

  const isSaveEnabled =
    role === 'Researcher'
      ? isAllValuesInObjNotEmpty(profileData ?? {}, [
          'orcid',
          'default_affiliation',
          'given_name',
          'email',
          'family_name',
        ])
      : isAllValuesInObjNotEmpty(profileData ?? {}, [
          'given_name',
          'email',
          'family_name',
        ]);

  return (
    <Wrapper>
      <Text>Edit Your Profile</Text>
      <ButtonsWrapper>
        <Button
          onClick={() => onCancel()}
          variant="contained"
          color="default"
          title="Discard Changes"
        />
        <Button
          onClick={() => onSave()}
          variant="contained"
          color="primary"
          disabled={!isSaveEnabled}
          title="Save Changes"
        />
      </ButtonsWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60px;
`;
const Text = styled.div`
  font-size: 20px;
  line-height: 1.2;
  color: #000;
  font-weight: bold;
`;
const ButtonsWrapper = styled.div`
  button {
    width: 165px;
    height: 48px;
  }
  div:first-child {
    margin-right: 12px;
  }
`;

export default Header;
