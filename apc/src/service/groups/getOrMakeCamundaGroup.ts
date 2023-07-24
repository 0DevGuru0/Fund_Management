import { startCase } from 'lodash';
import { NextApiRequest } from 'next';

import { HttpError, NotFoundError } from '$service/errors';
import { getCamundaPlatformRESTAPI, GroupDto } from '$service/generated/wfCamunda';
import { getOrganizations } from '$service/organizations/getOrganizations';

import { generateGroupId } from './generateGroupId';

const { getGroup, createGroup } = getCamundaPlatformRESTAPI();

export interface GroupInput {
  type: string;
  organizationId?: string;
}

export const getOrMakeCamundaGroup = async (
  group: GroupInput,
  req: NextApiRequest,
): Promise<GroupDto> => {
  const groupId = generateGroupId(group);

  try {
    const foundGroup = await getGroup(groupId, req);
    if (foundGroup) {
      return foundGroup;
    }
  } catch (err) {
    if ((err as HttpError).statusCode !== 400) {
      throw err;
    }
  }
  // finds the name of the organization to use in the group name
  let orgTitle = '';
  if (group.organizationId) {
    const [organization] = await getOrganizations({
      ids: [group.organizationId],
      limit: 1,
      skip: 0,
    });
    if (!organization) {
      throw new NotFoundError('Organization with this id is not found');
    }
    orgTitle = `${organization.title} `;
  }

  /**
   * example group
   * {
   *  id: 'FundManagerxxxxxxxxxxxxxxxxxxxxx',
   *  name: 'STDF FundManager',
   *  type: 'FundManager',
   * }
   */
  const newGroup = {
    id: groupId,
    name: `${orgTitle}${startCase(group.type)}`,
    type: 'WORKFLOW', // The type of the group is always WORKFLOW according to Camunda examples
  };

  await createGroup(newGroup, req);

  return newGroup;
};
