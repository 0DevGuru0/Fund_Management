import { v4 as uuidv4 } from 'uuid';

import { getFileStorageService } from '$data/fileStorage';

import { getDownloadFileURL } from './getDownloadFileUrl';

export const streamTemporaryExcelToS3 = async (
  stream: any,
  expire: Date,
  location: string,
  fileName?: string,
): Promise<any> => {
  const validFileName = fileName ?? uuidv4();
  const fileStorage = await getFileStorageService();
  await fileStorage.putObjectStream(
    `${location}/${validFileName}.csv`,
    stream,
    process.env.FILE_STORAGE_BUCKET!,
    expire,
  );
  return getDownloadFileURL(
    `${location}/${validFileName}.csv`,
    `${validFileName}.csv`,
    'text/csv',
    process.env.FILE_STORAGE_BUCKET!,
  );
};
