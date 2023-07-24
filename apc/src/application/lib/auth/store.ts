import { atom } from 'jotai';

import { KeyCloakToken } from '$service/auth/Token';

export const userTokenAtom = atom<KeyCloakToken | undefined>(undefined);
export const accessTokenAtom = atom<string | undefined>(undefined);

// TODO: We have to find a way to unify these two approaches into a single one
// this is our in memory storage for user's JWT Access Token
// We don't store this in local-storage or cookie because of security reasons
let accessToken: string | undefined;
export const getAccessToken = (): string | undefined => accessToken;
export const storeAccessToken = (at: string): void => {
  accessToken = at;
};
