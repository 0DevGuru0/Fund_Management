import { createReadStream } from 'fs';

import FormData from 'form-data';

import { DeploymentWithDefinitionsDto } from '$application/lib/generated/apcApi.schemas';

import { seedClient } from './helpers/seedClient';

export const createProcessDefs = async (): Promise<void> => {
  const processBPMN = createReadStream(
    './src/service/wfEngine/processes/definitions/APCFundRequest.bpmn',
  );

  const body = new FormData();
  body.append('deployment-name', 'APCFundRequest');
  body.append('enable-duplicate-filtering', 'true');
  body.append('deployment-source', 'Seeding Script');
  body.append('data', processBPMN);

  const { body: response } = await seedClient.post<DeploymentWithDefinitionsDto>(
    'deployment/create',
    {
      body,
      responseType: 'json',
    },
  );

  if (response.deployedProcessDefinitions) {
    console.info(
      `Successfully created the ${response.name} process definition: `,
      response,
    );
  } else {
    console.info(`${response.name} process definition is up to date`);
  }
};
