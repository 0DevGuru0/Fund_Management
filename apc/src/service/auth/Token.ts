/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */

import { TitleOrganization } from '$service/groups/getTokenRolesSplitted';

export interface ExtendedAffiliation {
  id: string;
  label: string;
}

export interface RefreshToken {
  exp: number;
  iat: number;
  jti: string;
  iss: string;
  aud: string;
  sub: string;
  typ: string;
  azp: string;
  scope: string;
  session_state: string;
}

export interface KeyCloakToken {
  exp: number;
  iat: number;
  sub: string;
  given_name: string;
  family_name: string;
  gender?: string;
  picture?: string;
  phone_number?: string;
  country?: string;
  email: string;
  email_verified: boolean;
  preferred_username: string;
  roles?: string[];
  orcid?: string;
  default_affiliation?: string;
}

export type ExtendedToken = Partial<
  Omit<KeyCloakToken, 'roles' | 'default_affiliation'>
> & {
  roles: TitleOrganization;
  affiliation?: ExtendedAffiliation;
};
