import { createProcessDefs } from './seedCamunda/createProcessDefs';

const seedCamunda = async (): Promise<void> => {
  try {
    await createProcessDefs();
  } catch (e) {
    console.error('Failed to migrate Camunda: ', e);
    process.exit(1);
  }
};

seedCamunda();
