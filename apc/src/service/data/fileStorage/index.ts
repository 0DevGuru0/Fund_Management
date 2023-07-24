import { FileStorageService } from './fileStorageService';
import { IFileStorageOptions } from './IFileStorageOptions';

let fileStorage: FileStorageService;

const options: IFileStorageOptions = {
  endpoint: process.env.FILE_STORAGE_ENDPOINT,
  accessKeyId: process.env.FILE_STORAGE_ACCESS_KEY_ID ?? '',
  bucket: process.env.FILE_STORAGE_BUCKET ?? '',
  downloadSignedURLExpirationTime:
    Number(process.env.FILE_STORAGE_DOWNLOAD_SIGNED_URL_EXPIRATION_TIME) ?? 0,
  secretAccessKey: process.env.FILE_STORAGE_SECRET_ACCESS_KEY ?? '',
  uploadSignedURLExpirationTime:
    Number(process.env.FILE_STORAGE_UPLOAD_SIGNED_URL_EXPIRATION_TIME) ?? 0,
  awsRegion: process.env.FILE_STORAGE_AWS_REGION ?? '',
};

export const getFileStorageService = async (): Promise<FileStorageService> => {
  if (!fileStorage) {
    fileStorage = new FileStorageService(options);
    await fileStorage.initialize();
  }
  return fileStorage;
};

export const initFileStorage = getFileStorageService;
