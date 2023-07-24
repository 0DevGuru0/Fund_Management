import React, { FC } from 'react';

import styled from 'styled-components';

import { ExtendedAffiliation } from '$service/auth/Token';

import ProfileViewBottom from './ProfileView/ProfileViewBottom';
import ProfileViewHeader from './ProfileView/ProfileViewHeader';

export interface ProfileFields {
  userName: string;
  fullName: string;
  profileImageSrc?: string;
  email: string;
  isEmailVerified?: boolean;
  gender?: string;
  country?: string;
  affiliation?: ExtendedAffiliation;
  orcid?: string;
}

export interface ProfileViewProps {
  userId: string;
  profile: ProfileFields;
  onEdit: () => void;
}

export const ProfileView: FC<ProfileViewProps> = ({ profile, onEdit }) => {
  return (
    <Container className="border">
      <ProfileViewHeader {...profile} onEdit={onEdit} />
      <ProfileViewBottom {...profile} />
    </Container>
  );
};

export default ProfileView;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.background.primary};
`;
