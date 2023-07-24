import { fetchFileData } from './fileTools';
import { issnToJournalId } from './issnToJournalId';
import { updateSjrById } from './updateSjrById';

import { sysLog } from '$logger';

const downloadPath = 'https://www.scimagojr.com/journalrank.php?out=xls';

export const fetchAndUpdateSjr = async (authorization: string): Promise<void> => {
  const startTime = new Date();
  sysLog.info(`Crawling SJR has been started at ${startTime.toTimeString()}`);

  const workbook = await fetchFileData(downloadPath);
  sysLog.info(`Data is ready for further process.`);

  if (workbook) {
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const issnToSjr = {};
    let row = 2;
    while (worksheet[`A${row}`]) {
      const issns = worksheet[`E${row}`].v.toString().split(', ');
      for (const issn of issns) {
        if (issn.length === 8) {
          issnToSjr[`${issn.slice(0, 4)}-${issn.slice(4)}`] = worksheet[`G${row}`].v;
        }
      }
      row++;
    }
    sysLog.info('data has been extracted');
    const idToSjr = await issnToJournalId(issnToSjr, authorization);
    sysLog.info('issn transformed to journal id and ready to update sjr');
    await updateSjrById(idToSjr, authorization);
  } else {
    sysLog.error(`Cannot reach data to parse`);
  }

  const elapsedTime = new Date().valueOf() - startTime.valueOf();
  sysLog.info(`Process has been finished in ${elapsedTime / 1000} seconds.`);
};
