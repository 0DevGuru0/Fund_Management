import React, { FC } from 'react';

import styled from 'styled-components';

import EditSVG from '$application/assets/icons/edit.svg';
import { IconButton } from '$application/components/atoms/buttons/IconButton';

export interface ProfileViewHeaderProps {
  userName: string;
  fullName: string;
  profileImageSrc?: string;
  onEdit: () => void;
}

export const ProfileViewHeader: FC<ProfileViewHeaderProps> = ({
  userName,
  fullName,
  profileImageSrc = '/emailAvatarPlaceholder.png',
  onEdit,
}) => {
  return (
    <Container>
      <MainInfo>
        <ProfileImg src={profileImageSrc} />
        <NameH2>{fullName}</NameH2>
        <UsernameP>{userName}</UsernameP>
      </MainInfo>
      <Edit>
        <IconButton
          color="Normal"
          icon={<EditSVG />}
          title="Edit"
          variant="WithText"
          onClick={() => onEdit()}
        />
      </Edit>
    </Container>
  );
};

export default ProfileViewHeader;

const Container = styled.div`
  display: flex;
  border-radius: 12px;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.palette.grey[400]};
`;

const MainInfo = styled.div`
  flex: 1;
  display: flex;
  padding: 36px;
  padding-left: 150px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const Edit = styled.div`
  margin: 35px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
`;

const ProfileImg = styled.img`
  width: 84px;
  height: 84px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const NameH2 = styled.h2`
  margin: 6px 0;
  color: ${({ theme }) => theme.text.contrast.secondary};
`;

const UsernameP = styled.p`
  margin: 0;
  font-size: 16px;
  color: ${({ theme }) => theme.palette.grey[800]};
`;
