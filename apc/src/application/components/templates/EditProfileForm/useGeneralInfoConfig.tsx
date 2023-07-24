import { css } from 'styled-components';
import { isLength } from 'validator';
import isEmail from 'validator/lib/isEmail';

import Select from '$application/components/molecules/inputs/Select';
import { Config, OnChange } from '$application/components/templates/EditProfileForm';
import { KeyCloakToken } from '$service/auth/Token';

import Country from './useGeneralInfoConfig/Country';
import EmailCmp from './useGeneralInfoConfig/Email';
import PhoneNumberCmp from './useGeneralInfoConfig/PhoneNumber';

type ConfigKeys =
  | 'First Name'
  | 'Last Name'
  | 'User Name'
  | 'Email'
  | 'Phone Number'
  | 'Gender'
  | 'Country';

export const useGeneralInfoConfig = (
  onChange: OnChange,
  profileData?: KeyCloakToken,
): Record<ConfigKeys, Config> => {
  return {
    'First Name': {
      name: 'given_name',
      renderLabel: true,
      validate: () => {
        if (!isLength(profileData?.given_name ?? '', { min: 3 })) {
          return 'first name length should be greater than 3';
        }
      },
      props: {
        width: 369,
        value: profileData?.given_name ?? '',
        onChange: (val) => onChange(val, 'given_name'),
      },
    },
    'Last Name': {
      name: 'family_name',
      renderLabel: true,
      validate: () => {
        if (!isLength(profileData?.family_name ?? '', { min: 3 })) {
          return 'last name length should be greater than 3';
        }
      },
      props: {
        width: 369,
        value: profileData?.family_name ?? '',
        errorText: 'last name length should be greater than 3',
        onChange: (val) => onChange(val, 'family_name'),
      },
    },
    'User Name': {
      renderLabel: true,
      name: 'preferred_username',
      props: { disabled: true, width: 369, value: profileData?.preferred_username },
    },
    Email: {
      renderLabel: true,
      name: 'email',
      renderer: EmailCmp,
      validate: () => {
        if (!isEmail(profileData?.email ?? '')) {
          return 'Email address is not valid';
        }
      },
      props: {
        isVerified: profileData?.email_verified,
        value: profileData?.email ?? '',
        width: 369,
        onChange: (val) => onChange(val, 'email'),
      },
    },
    'Phone Number': {
      renderLabel: true,
      name: 'phone_number',
      fullWidth: true,
      optional: true,
      renderer: PhoneNumberCmp,
      props: {
        country: 'us',
        value: profileData?.phone_number ?? '',
        variant: 'outlined',
        onChange: (val) => onChange(val, 'phone_number'),
      },
    },
    Gender: {
      renderLabel: true,
      name: 'gender',
      renderer: Select,
      optional: true,
      props: {
        items: ['Male', 'Female'],
        customStyle: css`
          width: 369px;
          & > div:first-child {
            background-color: ${({ theme }) => theme.palette.grey[200]};
            border-color: ${({ theme }) => theme.palette.grey[200]};
            :hover {
              background-color: #fff;
              border-color: ${({ theme }) => theme.palette.secondary};
            }
          }
        `,
        selectedItems: [profileData?.gender ?? ''],
        onSelect: (item) => onChange(item, 'gender'),
      },
    },
    Country: {
      renderLabel: true,
      name: 'country',
      optional: true,
      renderer: Country,
      props: {
        onSelect: (val) => onChange(val, 'country'),
        selectedItems: [profileData?.country ?? ''],
      },
    },
  };
};
export default useGeneralInfoConfig;
