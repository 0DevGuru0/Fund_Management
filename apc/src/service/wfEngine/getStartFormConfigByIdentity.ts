import { NextApiRequest } from 'next';

import { NotFoundError } from '$service/errors';
import { getCamundaPlatformRESTAPI } from '$service/generated/wfCamunda';

import { formPathToKey } from './formPathToKey';
import { getFormConfigByKey } from './getFormConfigByKey';
import { getFormVariables } from './getFormVariables';
import { mapProcessIdentityToKey } from './mapProcessIdentityToKey';

const { getStartFormByKey } = getCamundaPlatformRESTAPI();

export const getStartFormConfigByIdentity = async (
  processIdentity: string,
  req: NextApiRequest,
): Promise<Record<string, any>> => {
  const processDefinitionKey = await mapProcessIdentityToKey(processIdentity, req);

  const formData = await getStartFormByKey(processDefinitionKey, req);
  const formPath = formData.key;
  const startKey = formPathToKey(formPath);

  const config = await getFormConfigByKey(processDefinitionKey, startKey);
  if (!config) {
    throw new NotFoundError(
      `No form config found for the following process definition ID "${processIdentity}" and definition key "${processDefinitionKey}"`,
    );
  }

  return { ...config, variables: getFormVariables() };
};
