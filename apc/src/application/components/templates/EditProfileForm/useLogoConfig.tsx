import ProfileLogo from '$application/components/atoms/etc/ProfileAvatar';
import { Config, OnChange } from '$application/components/templates/EditProfileForm';
import { KeyCloakToken } from '$service/auth/Token';

type ConfigKeys = 'Avatar';

export const useLogoConfig = (
  onChange: OnChange,
  profileData?: KeyCloakToken,
): Record<ConfigKeys, Config> => {
  return {
    Avatar: {
      name: 'avatar',
      renderer: ProfileLogo,
      renderLabel: false,
      props: {
        width: 369,
        existLogoUrl: profileData?.picture,
        onChange: (val) => onChange(val, 'picture'),
      },
    },
  };
};
export default useLogoConfig;
