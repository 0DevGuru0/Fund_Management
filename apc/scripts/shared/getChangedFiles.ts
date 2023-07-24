import path from 'path';

import { compact } from 'lodash';
import gitP from 'simple-git/promise';

export type WorkingBranch = 'master' | 'nonMaster';

const gitRoot = path.resolve(__dirname, '../../../');
const git = gitP(gitRoot);

export const getChangedFiles = async (
  WorkingBranch: WorkingBranch,
): Promise<string[]> => {
  let changedFiles = '';

  switch (WorkingBranch) {
    case 'nonMaster':
      changedFiles = await git.diff(['origin/master', '--name-only']);
      break;
    case 'master':
      changedFiles = await git.diff(['HEAD^', 'HEAD', '--name-only']);
      break;
  }

  return compact(changedFiles.split('\n'));
};
