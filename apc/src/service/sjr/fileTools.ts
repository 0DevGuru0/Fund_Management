import fs from 'fs';

import XLSX from 'xlsx';

import { sysLog } from '$service/logger';

const basePath = './downloads';
const dlPath = `${basePath}/sjr.csv`;

export const fetchFileData = async (webPagePath: string): Promise<XLSX.WorkBook> => {
  let content: XLSX.WorkBook = { SheetNames: [''], Sheets: {} };
  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath);
  }
  if (fs.existsSync(dlPath)) {
    content = XLSX.readFile(dlPath);
  } else {
    await fetch(webPagePath)
      .then(async (res: any) => {
        const dest = fs.createWriteStream(dlPath);
        await new Promise<void>((resolve, reject) => {
          res.body.pipe(dest).on('finish', () => {
            content = XLSX.readFile(dlPath);
            resolve();
          });
        });
      })
      .catch((err) => {
        sysLog.error('Error while fetching file', err);
      });
  }

  return content;
};
