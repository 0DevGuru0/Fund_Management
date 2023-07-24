import UserRepresentation from '@keycloak/keycloak-admin-client/lib/defs/userRepresentation';

import { TitleOrganization } from '$service/groups/getTokenRolesSplitted';
import { JSONSchemaType } from '$service/validator/ajvTypes';

export type UserDto = UserRepresentation & {
  roles: TitleOrganization;
};

export const userDto: JSONSchemaType<UserDto> = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      nullable: true,
    },
    createdTimestamp: {
      type: 'number',
      nullable: true,
    },
    username: {
      type: 'string',
      nullable: true,
    },
    enabled: {
      type: 'boolean',
      nullable: true,
    },
    totp: {
      type: 'boolean',
      nullable: true,
    },
    emailVerified: {
      type: 'boolean',
      nullable: true,
    },
    disableableCredentialTypes: {
      type: 'array',
      items: {
        type: 'string',
      },
      nullable: true,
    },
    requiredActions: {
      type: 'array',
      items: {
        type: 'string',
      },
      nullable: true,
    },
    notBefore: {
      type: 'number',
      nullable: true,
    },
    access: {
      type: 'object',
      nullable: true,
    },
    attributes: {
      type: 'object',
      nullable: true,
    },
    clientConsents: {
      type: 'array',
      items: {
        type: 'object',
      },
      nullable: true,
    },
    clientRoles: {
      type: 'object',
      nullable: true,
    },
    credentials: {
      type: 'array',
      items: {
        type: 'object',
      },
      nullable: true,
    },
    email: {
      type: 'string',
      nullable: true,
    },
    federatedIdentities: {
      type: 'array',
      items: {
        type: 'object',
      },
      nullable: true,
    },
    federationLink: {
      type: 'string',
      nullable: true,
    },
    firstName: {
      type: 'string',
      nullable: true,
    },
    groups: {
      type: 'array',
      items: {
        type: 'string',
      },
      nullable: true,
    },
    lastName: {
      type: 'string',
      nullable: true,
    },
    origin: {
      type: 'string',
      nullable: true,
    },
    realmRoles: {
      type: 'array',
      items: {
        type: 'string',
      },
      nullable: true,
    },
    self: {
      type: 'string',
      nullable: true,
    },
    serviceAccountClientId: {
      type: 'string',
      nullable: true,
    },
    roles: {
      type: 'object',
    },
  },
};
