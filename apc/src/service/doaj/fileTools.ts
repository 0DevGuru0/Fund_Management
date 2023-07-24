import fs from 'fs';
import path from 'path';

import decompress from 'decompress';
import decompressTargz from 'decompress-targz';

import { sysLog } from '$service/logger';

import { mockData } from './mockData';

const isDev = process.env.NODE_ENV === 'development';

const basePath = './downloads';
const dlPath = `${basePath}/doaj.tar.gz`;

const getContent = (source: string, isDir: boolean): string[] =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => (isDir ? dirent.isDirectory() : dirent.isFile()))
    .map((dirent) => dirent.name);

const removeDir = function (destination: string): void {
  if (fs.existsSync(destination)) {
    const files = fs.readdirSync(destination);

    if (files.length > 0) {
      files.forEach(function (filename) {
        if (fs.statSync(`${destination}/${filename}`).isDirectory()) {
          removeDir(`${destination}/${filename}`);
        } else {
          fs.unlinkSync(`${destination}/${filename}`);
        }
      });
      fs.rmdirSync(destination);
    } else {
      fs.rmdirSync(destination);
    }
  } else {
    sysLog.error('Directory path not found.');
  }
};

export const fetchFileData = async (webPagePath: string): Promise<any> => {
  let webPageContent = {};

  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath);
  }

  if (isDev) {
    webPageContent = mockData;
  } else {
    await fetch(webPagePath)
      .then(async (res: any) => {
        const dest = fs.createWriteStream(dlPath);
        await new Promise<void>((resolve, reject) => {
          res.body.pipe(dest).on('finish', () => {
            decompress(dlPath, basePath, {
              plugins: [decompressTargz()],
            })
              .then(() => {
                sysLog.info('Files decompressed');
                const innerFolder = path.join(basePath, getContent(basePath, true)[0]);
                const finalFile = path.join(
                  innerFolder,
                  getContent(innerFolder, false)[0],
                );
                const rawData = fs.readFileSync(finalFile);
                const data = JSON.parse(rawData.toString());
                sysLog.info(`Extracted ${data.length} records from json file.`);
                webPageContent = data;
                removeDir(basePath);
                resolve();
              })
              .catch((err) => {
                sysLog.error('Error while decompressing file', err);
                reject();
              });
          });
        });
      })
      .catch((err) => {
        sysLog.error('Error while fetching file', err);
      });
  }

  return webPageContent;
};
