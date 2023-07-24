import { createProcessDefs } from './seedCamunda/createProcessDefs';
import { createUsersAndGroups } from './seedCamunda/createUsersAndGroups';

const seedCamunda = async (): Promise<void> => {
  await createProcessDefs();
  await createUsersAndGroups();
};

try {
  seedCamunda();
} catch (err) {
  console.error('Failed to seed DB');
}
