import { fetchFileData } from './fileTools';
import dataImporter from './importer';
import dataParser from './parser';

import { sysLog } from '$logger';

const downloadPath = 'https://doaj.org/public-data-dump/journal';

const doajCrawler = async (): Promise<void> => {
  const startTime = new Date();
  sysLog.info(`Crawling DOAJ has been started at ${startTime.toTimeString()}`);

  const data = await fetchFileData(downloadPath);
  sysLog.info(`Data is ready for further process.`);

  if (data) {
    sysLog.info(`Parsing data ...`);
    const { journalsList, publishersList } = await dataParser(data);
    sysLog.info(`Sending parsed data to importer ...`);
    await dataImporter(journalsList, publishersList);
  } else {
    sysLog.error(`Cannot reach data to parse`);
  }

  const elapsedTime = new Date().valueOf() - startTime.valueOf();
  sysLog.info(`Process has been finished in ${elapsedTime / 1000} seconds.`);
};

export default doajCrawler;
