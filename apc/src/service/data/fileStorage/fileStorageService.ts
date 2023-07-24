/* eslint-disable no-console */
import { Stream } from 'stream';

import { S3, AWSError } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
import Bluebird from 'bluebird';

import { sysLog } from '$service/logger';

import { IFileStorageOptions } from './IFileStorageOptions';

interface CommonSingedURLOptions {
  Expires: number;
}

interface SignedURLOptions extends CommonSingedURLOptions {
  ResponseContentDisposition: string;
  ResponseContentType: string;
}

interface PresignedURLOptions extends CommonSingedURLOptions {
  Conditions: any[];
  Fields: any;
}

export class FileStorageService {
  private client?: S3;
  constructor(private readonly options: IFileStorageOptions) {}

  async initialize(): Promise<void> {
    this.client = await this.getClient();
  }

  private async getClient(): Promise<S3> {
    if (this.client != null) {
      return this.client;
    }
    let client: S3;
    try {
      client = new S3({
        accessKeyId: this.options.accessKeyId,
        secretAccessKey: this.options.secretAccessKey,
        endpoint: this.options.endpoint,
        region: this.options.awsRegion,
        s3ForcePathStyle: true,
        signatureVersion: 'v4',
      });
      await client.headBucket({ Bucket: this.options.bucket });
    } catch (err) {
      sysLog.info(`BlobStorage: could not connect to S3 storage`);
      await Bluebird.Promise.delay(5000);
      sysLog.error(
        `BlobStorage: trying to reconnect S3 storage at ${
          this.options.endpoint || 'AWS'
        }`,
      );
      return this.getClient();
    }
    sysLog.info(`BlobStorage: successfully connected to S3 storage`);
    return client;
  }

  putObjectStream = (
    key: string,
    fileStream: Stream,
    bucket: string = this.options.bucket,
    expires?: Date,
  ): Promise<S3.ManagedUpload.SendData> =>
    this.client!.upload({
      Key: key,
      Body: fileStream,
      Bucket: bucket,
      Expires: expires,
    }).promise();

  getObjectMetaData = (
    key: string,
    bucket: string = this.options.bucket,
  ): Promise<PromiseResult<S3.HeadObjectOutput, AWSError>> =>
    this.client!.headObject({
      Key: key,
      Bucket: bucket,
    }).promise();

  deleteObjects = (
    objectKeys: string[],
    bucket: string = this.options.bucket,
  ): Promise<PromiseResult<S3.DeleteObjectsOutput, AWSError>> =>
    this.client!.deleteObjects({
      Delete: {
        Objects: objectKeys.map((objectKey) => ({ Key: objectKey })),
      },
      Bucket: bucket,
    }).promise();

  getDownloadSignedUrl = async (
    key: string,
    operation: 'getObject' | 'putObject',
    options: SignedURLOptions,
    bucket: string = this.options.bucket,
  ): Promise<string> => {
    return this.client!.getSignedUrl(operation, { ...options, Key: key, Bucket: bucket });
  };

  getUploadSignedUrl = async (
    key: string,
    options: PresignedURLOptions,
    bucket: string = this.options.bucket,
  ): Promise<S3.PresignedPost> =>
    this.client!.createPresignedPost({
      Bucket: bucket,
      ...options,
      Fields: {
        key,
      },
    });
}
