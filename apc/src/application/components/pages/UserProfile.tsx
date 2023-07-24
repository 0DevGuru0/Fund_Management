import React, { useState } from 'react';

import { NextPage } from 'next';
import styled from 'styled-components';

import { ProfileSidebar } from '$application/components/atoms/etc/ProfileSidebar';
import ProfileView, {
  ProfileFields,
} from '$application/components/molecules/cards/ProfileView';
import { useUserInfo } from '$application/lib/auth/useUserInfo';

import EditProfileForm from '../templates/EditProfileForm';

interface PageProps {
  pageLayout: 'Management' | 'Researcher';
  userId: string;
}

const UserProfile: NextPage<PageProps> = ({ userId }) => {
  const userInfo = useUserInfo();
  const [editMode, setEditMode] = useState(false);

  const user: ProfileFields = {
    orcid: userInfo?.orcid,
    email: userInfo?.email ?? '-',
    profileImageSrc: userInfo?.picture,
    isEmailVerified: userInfo?.email_verified,
    affiliation: userInfo?.affiliation,
    gender: userInfo?.gender ?? '-',
    country: userInfo?.country ?? '-',
    userName: userInfo?.preferred_username ?? '-',
    fullName: userInfo ? `${userInfo.given_name} ${userInfo.family_name}` : 'N/A',
  };

  const enableEditMode = () => setEditMode(true);
  const disableEditMode = () => {
    setEditMode(false);
    location.reload();
  };

  return (
    <Container>
      <SideController>
        <ProfileSidebar />
      </SideController>
      <InfoContainer>
        {editMode ? (
          <EditProfileForm onCancel={disableEditMode} onDone={disableEditMode} />
        ) : (
          <ProfileView profile={user} userId={userId} onEdit={enableEditMode} />
        )}
      </InfoContainer>
    </Container>
  );
};

export default UserProfile;

const Container = styled.div`
  display: flex;
  padding: 0 36px;
`;

const SideController = styled.div`
  padding: 36px 36px 0 0;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 36px 0 0 36px;
  border-left: 1px ${({ theme }) => theme.palette.grey[400]} solid;
`;
