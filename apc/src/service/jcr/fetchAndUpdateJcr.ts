import { fetchFileData } from './fileTools';
import { issnToJournalId } from './issnToJournalId';
import { updateJcrById } from './updateJcrById';

import { sysLog } from '$logger';

export const fetchAndUpdateJcr = async (authorization: string): Promise<void> => {
  const startTime = new Date();
  sysLog.info(`Crawling JCR has been started at ${startTime.toTimeString()}`);

  const workbooks = fetchFileData();
  sysLog.info(`Data is ready for further process.`);

  if (workbooks.SCIE && workbooks.SSCI) {
    const SCIE = workbooks.SCIE.Sheets[workbooks.SCIE.SheetNames[0]];
    const SSCI = workbooks.SSCI.Sheets[workbooks.SSCI.SheetNames[0]];
    const issnToJcr = {};
    let row = 2;
    while (SCIE[`A${row}`]) {
      if (SCIE[`D${row}`]) {
        issnToJcr[SCIE[`D${row}`].v] = SCIE[`AO${row}`].v;
      }
      if (SCIE[`E${row}`]) {
        issnToJcr[SCIE[`E${row}`].v] = SCIE[`AO${row}`].v;
      }
      row++;
    }
    while (SSCI[`A${row}`]) {
      if (SSCI[`D${row}`]) {
        issnToJcr[SSCI[`D${row}`].v] = SSCI[`AO${row}`].v;
      }
      if (SSCI[`E${row}`]) {
        issnToJcr[SSCI[`E${row}`].v] = SSCI[`AO${row}`].v;
      }
      row++;
    }
    sysLog.info('data has been extracted');
    const idToJcr = await issnToJournalId(issnToJcr, authorization);
    sysLog.info('issn transformed to journal id and ready to update jcr');
    await updateJcrById(idToJcr, authorization);
  } else {
    sysLog.error(`Cannot reach data to parse`);
  }

  const elapsedTime = new Date().valueOf() - startTime.valueOf();
  sysLog.info(`Process has been finished in ${elapsedTime / 1000} seconds.`);
};
