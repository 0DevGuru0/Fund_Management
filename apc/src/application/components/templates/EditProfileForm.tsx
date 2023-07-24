import React, { ReactElement, useState } from 'react';

import clsx from 'classnames';
import { useAtom } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import { isEmpty } from 'lodash';
import styled from 'styled-components';

import { useEditUserApi } from '$application/lib/generated/apcApi';
import { getUserRole } from '$application/utils/userRole';
import { ExtendedAffiliation } from '$service/auth/Token';

import Header from './EditProfileForm/Header';
import Renderer from './EditProfileForm/Renderer';
import { affiliationAtom, profileDataAtom } from './EditProfileForm/store';
import useFurtherInfoConfig from './EditProfileForm/useFurtherConfig';
import useGeneralInfoConfig from './EditProfileForm/useGeneralInfoConfig';
import useLogoConfig from './EditProfileForm/useLogoConfig';

export interface Config {
  name: string;
  props: Record<string, any>;
  fullWidth?: boolean;
  optional?: boolean;
  renderLabel: boolean;
  validate?: () => Promise<string | undefined> | string | undefined;
  renderer?: (props: any) => JSX.Element | ReactElement<any, any> | null;
}

export type OnChange = (
  value: string | number | ExtendedAffiliation,
  fieldName: string,
) => void;

interface EditProfileFormProps {
  className?: string;
  onDone: () => void;
  onCancel: () => void;
}

export const EditProfileForm = ({
  className,
  onDone,
  onCancel,
}: EditProfileFormProps) => {
  const [profileData, setProfileData] = useAtom(profileDataAtom);
  const [formValidation, setFormValidation] = useState<Record<string, string>>({});
  const setAffiliationAtom = useUpdateAtom(affiliationAtom);
  const editUserMutation = useEditUserApi({
    mutation: { onSuccess: () => onDone() },
  });
  const { role } = getUserRole();
  const onChange: OnChange = (value, fieldName) => {
    let tempValue;
    if (fieldName === 'default_affiliation') {
      const castedValue = value as ExtendedAffiliation;
      if (castedValue.id) {
        tempValue = castedValue.id;
      }
      setAffiliationAtom(castedValue);
    } else {
      tempValue = value;
    }

    const newAccessToken = (preAccessToken) => ({
      ...preAccessToken,
      [fieldName]: tempValue,
    });
    setProfileData(newAccessToken);
  };

  const furtherInfoConfig = useFurtherInfoConfig(onChange, profileData);
  const generalInfoConfig = useGeneralInfoConfig(onChange, profileData);
  const logoConfig = useLogoConfig(onChange, profileData);

  const saveHandler = async () => {
    const config =
      role === 'Researcher'
        ? {
            ...generalInfoConfig,
            ...furtherInfoConfig,
            ...logoConfig,
          }
        : {
            ...generalInfoConfig,
            ...logoConfig,
          };

    const resultPromises = await Object.values(config).map(async (conf) => [
      conf.name,
      await conf.validate?.(),
    ]);

    const newFormValidation = await Object.fromEntries(await Promise.all(resultPromises));
    setFormValidation(newFormValidation);
    const validationResult = Object.values(newFormValidation).filter((val) => val);
    if (validationResult.length === 0) {
      const profileAvatar = !isEmpty(profileData?.picture)
        ? profileData?.picture
        : 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';

      let phone: string = '';
      if (profileData?.phone_number) {
        if (profileData?.phone_number[0] === '+') {
          phone = profileData?.phone_number;
        } else {
          phone = `+${profileData?.phone_number}`;
        }
      }
      if (role === 'Researcher') {
        await editUserMutation.mutateAsync({
          username: profileData?.preferred_username ?? '',
          data: {
            attributes: {
              country: profileData?.country,
              defaultAffiliation: profileData?.default_affiliation ?? '',
              gender: profileData?.gender,
              orcid: profileData?.orcid,
              phoneNumber: phone,
              picture: profileAvatar,
            },
            email: profileData?.email,
            firstName: profileData?.given_name,
            lastName: profileData?.family_name,
          },
        });
      } else {
        await editUserMutation.mutateAsync({
          username: profileData?.preferred_username ?? '',
          data: {
            attributes: {
              country: profileData?.country,
              gender: profileData?.gender,
              phoneNumber: phone,
              picture: profileAvatar,
            },
            email: profileData?.email,
            firstName: profileData?.given_name,
            lastName: profileData?.family_name,
          },
        });
      }
    }
  };

  const config: Record<string, Record<string, Config>> =
    role === 'Researcher'
      ? {
          'User Avatar': logoConfig,
          'General Information': generalInfoConfig,
          'Further information': furtherInfoConfig,
        }
      : {
          'User Avatar': logoConfig,
          'General Information': generalInfoConfig,
        };

  return (
    <div className={clsx('EditProfileForm', className)}>
      <Header onCancel={onCancel} onSave={saveHandler} role={role} />
      {Object.entries(config).map(([title, conf]) => (
        <Wrapper key={title}>
          <Title>{title}</Title>
          <Renderer config={conf} errors={formValidation} />
        </Wrapper>
      ))}
    </div>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const Title = styled.div`
  margin-right: 82px;
  min-width: 150px;
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.grey[600]};
`;

export default EditProfileForm;
