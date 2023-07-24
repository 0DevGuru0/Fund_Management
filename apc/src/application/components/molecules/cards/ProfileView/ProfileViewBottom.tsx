import React, { FC } from 'react';

import styled from 'styled-components';

import { getUserRole } from '$application/utils/userRole';
import { ExtendedAffiliation } from '$service/auth/Token';

import InfoNameValue from './ProfileViewBottom/InfoNameValue';

export interface ProfileViewBottomProps {
  email: string;
  isEmailVerified?: boolean;
  gender?: string;
  country?: string;
  affiliation?: ExtendedAffiliation;
  orcid?: string;
}

export const ProfileViewBottom: FC<ProfileViewBottomProps> = ({
  email,
  isEmailVerified = false,
  gender,
  country,
  affiliation,
  orcid,
}) => {
  const { role } = getUserRole();
  return (
    <Container>
      <InfoRow>
        <InfoColumn>
          <InfoNameValue name="Email">
            <EmailValue>
              <InfoValueP style={{ margin: 0 }}>{email}</InfoValueP>
              {isEmailVerified && (
                <EmailVerified>
                  <VerifiedImg src={'/icon-check-circle.png'} />
                  <VerifiedWord>Verified</VerifiedWord>
                </EmailVerified>
              )}
            </EmailValue>
          </InfoNameValue>
          <InfoNameValue name="Country" value={country} />
        </InfoColumn>
        <InfoColumn>
          <InfoNameValue name="Gender" value={gender} />
        </InfoColumn>
      </InfoRow>
      <Separator />
      {role === 'Researcher' && (
        <InfoRow>
          <InfoColumn>
            <InfoNameValue name="Affiliation" value={affiliation?.label} />
          </InfoColumn>
          <InfoColumn>
            <InfoNameValue name="ORCID" value={orcid} />
          </InfoColumn>
        </InfoRow>
      )}
    </Container>
  );
};

export default ProfileViewBottom;

const Container = styled.div`
  display: flex;
  padding: 0 120px;
  padding-top: 12px;
  flex-direction: column;
`;

const InfoRow = styled.div`
  gap: 150px;
  display: flex;
  margin-top: 36px;
  justify-content: space-between;
`;

const InfoColumn = styled.div`
  flex: 1;
  display: flex;
  min-width: 250px;
  flex-direction: column;
  justify-content: space-between;
`;

const Separator = styled.div`
  height: 0;
  margin: 12px 0;
  display: inline-block;
  border-top: 1px solid ${({ theme }) => theme.palette.grey[400]};
`;

const EmailValue = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  margin: 12px 0 0;
  justify-content: space-between;
`;

const EmailVerified = styled.div`
  display: flex;
  margin-left: 24px;
`;

const VerifiedImg = styled.img`
  width: 18px;
  height: 18px;
`;

const VerifiedWord = styled.p`
  margin: 0;
  margin-left: 3px;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.secondaryMiddle};
`;

const InfoValueP = styled.p`
  height: 20px;
  font-size: 16px;
  margin: 12px 0 0;
  font-weight: 600;
  color: ${({ theme }) => theme.text.contrast.secondary};
`;
