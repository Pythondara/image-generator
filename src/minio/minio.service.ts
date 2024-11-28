import { Injectable, Logger } from '@nestjs/common';
import * as Minio from 'minio';
import { ConfigService } from '@nestjs/config';

import { ConfigVariables } from '../config';

@Injectable()
export class MinioService {
  private readonly logger = new Logger(MinioService.name);
  private readonly minioClient: Minio.Client;

  constructor(private readonly config: ConfigService<ConfigVariables, true>) {
    this.minioClient = new Minio.Client({
      endPoint: this.config.get('minio.endPoint', { infer: true }),
      port: this.config.get('minio.port', { infer: true }),
      useSSL: false,
      accessKey: this.config.get('minio.accessKey', { infer: true }),
      secretKey: this.config.get('minio.secretKey', { infer: true }),
    });
  }

  async makeBucket(bucketName: string) {
    this.logger.log({ message: 'Creating bucket', data: bucketName });

    const isExists = await this.minioClient.bucketExists(bucketName);

    if (!isExists) {
      const bucket = this.minioClient.makeBucket(bucketName);

      this.logger.log({
        message: 'Bucket successfully created',
        data: bucketName,
      });

      return bucket;
    }

    return true;
  }

  async uploadFile(
    bucketName: string,
    fileName: string,
    stream: Buffer | string,
  ) {
    return this.minioClient.putObject(bucketName, fileName, stream);
  }

  async getFile(bucketName: string, fileName: string) {
    return this.minioClient.getObject(bucketName, fileName);
  }

  async getPresignedUrl(bucketName: string, fileName: string) {
    return this.minioClient.presignedGetObject(bucketName, fileName);
  }
}
