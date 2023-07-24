/* eslint-disable no-console */
import { getChangedMessage } from './publish-chromatic/getMessage';
import { isFrontendUIAffected } from './publish-chromatic/isFrontendUIAffected';
import { publishChangedOnChromatic } from './publish-chromatic/publishChangesOnChromatic';
import { getChangedFiles } from './shared/getChangedFiles';

const onMasterBranch = process.env.CI_COMMIT_REF_NAME === 'master';
const workingBranch = onMasterBranch ? 'master' : 'nonMaster';

getChangedFiles(workingBranch).then((changedFiles) => {
  const message = getChangedMessage(workingBranch);
  console.info(`\n🔄 🔄 ${message}: \n`, changedFiles, '\n');

  const needToPublishChromatic = isFrontendUIAffected(changedFiles);

  if (!needToPublishChromatic) {
    console.info(`No changes on the frontend. skip publishing on chromatic`);
    return;
  }

  publishChangedOnChromatic(workingBranch);
});
