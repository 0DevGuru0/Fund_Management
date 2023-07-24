import { NextApiRequest } from 'next';
import { validate as validateUUID } from 'uuid';

import { getCamundaPlatformRESTAPI } from '$service/generated/wfCamunda';

const { getProcessDefinition } = getCamundaPlatformRESTAPI();

export const mapProcessIdentityToKey = async (
  processIdentity: string,
  req: NextApiRequest,
): Promise<string> => {
  return validateUUID(processIdentity.split(':')[2])
    ? (await getProcessDefinition(processIdentity, req)).key!
    : processIdentity;
};
