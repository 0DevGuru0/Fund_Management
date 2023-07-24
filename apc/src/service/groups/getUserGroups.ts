import { NextApiRequest } from 'next';

import { getCamundaPlatformRESTAPI, GroupDto } from '$service/generated/wfCamunda';

const { postQueryGroups } = getCamundaPlatformRESTAPI();

export const getUserGroups = async (
  username: string,
  req: NextApiRequest,
): Promise<GroupDto[]> => {
  return postQueryGroups({ member: username }, {}, req);
};
