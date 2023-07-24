import { getFileStorageService } from '$data/fileStorage';

const EXPIRATION_TIME =
  Number(process.env.FILE_STORAGE_DOWNLOAD_SIGNED_URL_EXPIRATION_TIME) ?? 0;

export const getDownloadFileURL = async (
  fileKey: string,
  fileName: string,
  mimeType?: string,
  bucket?: string,
  contentDisposition: string = 'attachment',
): Promise<any> => {
  const fileStorage = await getFileStorageService();

  const signedUrl = await fileStorage.getDownloadSignedUrl(
    fileKey,
    'getObject',
    {
      ResponseContentDisposition: `${contentDisposition}; filename="${encodeURIComponent(
        fileName,
      )}"`,
      ResponseContentType: mimeType ?? 'application/pdf',
      Expires: EXPIRATION_TIME,
    },
    bucket,
  );

  return signedUrl;
};

export const getFileKeyFromUrl = (fileUrl: string): string => {
  const url = new URL(fileUrl);
  const pathNameArray = url.pathname.split('/');
  const fileKey = `${pathNameArray[pathNameArray.length - 2]}/${
    pathNameArray[pathNameArray.length - 1]
  }`;
  return fileKey;
};
