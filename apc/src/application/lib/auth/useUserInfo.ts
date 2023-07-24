import { useAtomValue } from 'jotai/utils';

import { ExtendedAffiliation, ExtendedToken } from '$service/auth/Token';
import { getTokenRolesSplitted } from '$service/groups/getTokenRolesSplitted';

import { useGetTitleByIdsQuery } from '../generated/repoGqlTypes';

import { userTokenAtom } from './store';

export const useUserInfo = (): ExtendedToken => {
  const userToken = useAtomValue(userTokenAtom);
  let affiliation: ExtendedAffiliation | undefined;
  if (userToken?.default_affiliation) {
    const [{ data }] = useGetTitleByIdsQuery({
      variables: {
        ids: userToken?.default_affiliation,
      },
    });
    if (data?.getItems[0]) {
      affiliation = {
        id: data.getItems[0].id,
        label: data.getItems[0].title,
      };
    }
  }

  return {
    ...userToken,
    roles: getTokenRolesSplitted(userToken),
    affiliation,
  };
};
