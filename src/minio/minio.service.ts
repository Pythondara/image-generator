import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';
import { ConfigService } from '@nestjs/config';
import { ConfigVariables } from '../config';

@Injectable()
export class MinioService {
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

  async uploadFile(bucketName: string, fileName: string, buffer: Buffer) {
    await this.minioClient.makeBucket(bucketName);
    return this.minioClient.putObject(bucketName, fileName, buffer);
  }

  async getFile(bucketName: string, fileName: string) {
    const data = await this.minioClient.getObject(bucketName, fileName);
    return data;
  }

  async getPresignedUrl(
    bucketName: string,
    fileName: string,
    expiresIn: number,
  ) {
    return this.minioClient.presignedGetObject(bucketName, fileName, expiresIn);
  }
}
