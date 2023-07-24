import doajCrawler from '$service/doaj/crawler';

export const getDOAJData = async (): Promise<string> => {
  await doajCrawler();
  return `DOAJ Data importer called`;
};
