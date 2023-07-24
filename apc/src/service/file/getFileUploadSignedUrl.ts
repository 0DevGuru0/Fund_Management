import { PresignedPost } from 'aws-sdk/clients/s3';

import { getFileStorageService } from '$data/fileStorage';

import { getFileStorageKey } from './getFileStorageKey';

export interface UploadSignedUrl extends PresignedPost {
  fileKey: string;
}

const MAX_FILE_SIZE = 52428800;

const EXPIRATION_TIME =
  Number(process.env.FILE_STORAGE_UPLOAD_SIGNED_URL_EXPIRATION_TIME) ?? 0;

export const getFileUploadSignedUrl = async (
  orgId: string,
  fileHashName: string,
  mimeType?: string,
  bucket?: string,
): Promise<UploadSignedUrl> => {
  const fileStorage = await getFileStorageService();

  const fileKey = getFileStorageKey(fileHashName, orgId);

  const presignedURL = await fileStorage.getUploadSignedUrl(
    fileKey,
    {
      Expires: EXPIRATION_TIME,
      Conditions: [['content-length-range', 0, Number(MAX_FILE_SIZE)]],
      Fields: {
        'Content-Type': mimeType ?? 'application/pdf',
        'X-Amz-Expires': EXPIRATION_TIME,
        'X-Amz-SignedHeaders': 'host',
      },
    },
    bucket,
  );

  return { ...presignedURL, fileKey: fileHashName };
};
