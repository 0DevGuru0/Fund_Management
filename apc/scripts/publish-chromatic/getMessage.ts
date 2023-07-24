import { WorkingBranch } from '../shared/getChangedFiles';

export const getChangedMessage = (workingBranch: WorkingBranch): string => {
  switch (workingBranch) {
    case 'nonMaster':
      return 'Different files in comparison with the master';
    case 'master':
      return 'Changes since the last commit on master';
  }
};
