import { useAtomValue } from 'jotai/utils';

import Autocomplete from '$application/components/organisms/inputs/Autocomplete';
import { useAffiliation } from '$application/components/pages/Report/reportConfig/useAffiliation';
import { Config, OnChange } from '$application/components/templates/EditProfileForm';
import { useUserInfo } from '$application/lib/auth/useUserInfo';
import { useValidateOrcid } from '$application/lib/generated/apcApi';
import { KeyCloakToken } from '$service/auth/Token';

import { affiliationAtom } from './store';

type ConfigKeys = 'Affiliation' | 'ORCID';

export const useFurtherInfoConfig = (
  onChange: OnChange,
  profileData?: KeyCloakToken,
): Record<ConfigKeys, Config> => {
  const { data, refetch } = useValidateOrcid(
    { orcidId: profileData?.orcid },
    { query: { enabled: false } },
  );
  const affiliationAtomValue = useAtomValue(affiliationAtom);

  const {
    items: affiliations,
    onFilterChange: affiliationFilterChange,
    onLoadMore,
  } = useAffiliation();

  const { affiliation: currentAffiliation } = useUserInfo();

  const selectedAffiliation =
    !affiliationAtomValue.id && currentAffiliation
      ? currentAffiliation
      : affiliationAtomValue;

  return {
    Affiliation: {
      name: 'default_affiliation',
      renderer: Autocomplete,
      fullWidth: true,
      renderLabel: true,
      props: {
        items: affiliations,
        placeHolder: 'Select Policy',
        selectedItems: [selectedAffiliation],
        onSelect: (item: any) => onChange(item, 'default_affiliation'),
        onFilterChange: (item: any) => affiliationFilterChange(item),
        onLoadMoreItems: onLoadMore,
      },
    },
    ORCID: {
      name: 'orcid',
      fullWidth: true,
      renderLabel: true,
      validate: async () => {
        await refetch();
        if (data?.isValid) {
          return 'Orcid is not valid.';
        }
      },
      props: {
        $width: '762px',
        value: profileData?.orcid ?? '',
        onChange: (val) => onChange(val, 'orcid'),
      },
    },
  };
};
export default useFurtherInfoConfig;
