export interface IFileStorageOptions {
  awsRegion?: string;
  endpoint?: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
  downloadSignedURLExpirationTime: number;
  uploadSignedURLExpirationTime: number;
}
