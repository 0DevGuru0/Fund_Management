import { PassThrough } from 'stream';

import { getFileStorageService } from '$data/fileStorage';
import { Result } from '$pages/api/v1/upload/file';
import { getDownloadFileURL } from '$service/file/getDownloadFileUrl';
import { getFileStorageKey } from '$service/file/getFileStorageKey';
import { sysLog } from '$service/logger';
import { parseFormData } from '$service/util/parseFormData';

const bucket = process.env.FILE_STORAGE_BUCKET;
export const uploadDirectlyToS3 = async (req, orgId): Promise<Result> => {
  const fileStorage = await getFileStorageService();
  const uploadStream = (file): any => {
    const pass = new PassThrough();
    fileStorage
      .putObjectStream(getFileStorageKey(file.newFilename, orgId), pass, bucket)
      .catch((err) => sysLog.error(err));

    return pass;
  };

  const { files } = await parseFormData(req, uploadStream);

  const { originalFilename, mimetype, size, newFilename } = files.file;

  const downloadUrl = await getDownloadFileURL(
    getFileStorageKey(newFilename, orgId),
    originalFilename,
    mimetype,
    bucket,
  );

  return { name: originalFilename, size, url: downloadUrl };
};

export default uploadDirectlyToS3;
