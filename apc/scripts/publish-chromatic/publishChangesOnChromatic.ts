import { exec } from 'shelljs';

import { WorkingBranch } from '../shared/getChangedFiles';

export const publishChangedOnChromatic = (workingBranch: WorkingBranch): void => {
  const commands = ['cd ../'];

  switch (workingBranch) {
    case 'nonMaster':
      {
        commands.push(
          `npm run chromatic -- --exit-zero-on-changes --branch-name=${process.env.CI_COMMIT_REF_NAME}`,
        );
      }
      break;
    case 'master':
      {
        commands.push(`npm run chromatic -- --auto-accept-changes`);
      }
      break;
  }

  const executionCommand = commands.join(' && ');
  exec(executionCommand);
};
