import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import * as sharp from 'sharp';

import { ConfigVariables } from '../config';
import {
  GenerateImageParamsDto,
  GenerateImageQueryDto,
  RequestParamsDto,
  TypeEnum,
} from './dto';
import { FusionBrainResponseDto } from './dto/response/fusion-brain-response.dto';
import { MinioService } from '../minio/minio.service';
import { ImageService } from '../image/image.service';

@Injectable()
export class FusionBrainService {
  private readonly logger = new Logger(FusionBrainService.name);
  private readonly bucketName: string;
  private readonly fusionBrainUrl: string;

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService<ConfigVariables, true>,
    private readonly minioService: MinioService,
    private readonly imageService: ImageService,
  ) {
    this.bucketName = this.config.get('minio.bucketName', { infer: true });
    this.fusionBrainUrl = this.config.get('fusionBrain.url', { infer: true });
  }
  async generate(
    queryDto: GenerateImageQueryDto,
    styleDto: GenerateImageParamsDto,
  ) {
    const url = this.fusionBrainUrl + 'key/api/v1/text2image/run';

    const formattedUrl = new URL(url).toString();

    const requestData: RequestParamsDto = {
      type: TypeEnum.GENERATE,
      style: styleDto.style,
      width: 1024,
      height: 1024,
      num_images: 1,
      negativePromptUnclip: '',
      generateParams: {
        query: queryDto.prompt,
      },
    };

    const json = JSON.stringify(requestData);

    const blob = new Blob([json], {
      type: 'application/json',
    });

    const formData = new FormData();
    formData.append('params', blob);
    formData.append('model_id', '4');

    await this.minioService.makeBucket('hui');

    try {
      this.logger.log({ message: 'Sending response to generate the image...' });

      this.logger.debug({
        message: 'Sending response to generate the image',
        data: { formData },
      });

      const { data } = (await lastValueFrom(
        this.http.post(formattedUrl, formData),
      )) as AxiosResponse<FusionBrainResponseDto>;

      this.logger.log({ message: 'Response successfully sent' });

      this.logger.debug({
        message: 'Response successfully sent',
        data: { data },
      });

      await this.imageService.create({
        imageName: data.uuid + '.webp',
        uuid: data.uuid,
      });

      return { uuid: data.uuid };
    } catch (err) {
      this.logger.error({ message: 'Something went wrong', data: { err } });

      throw new BadRequestException({
        message: 'Something went wrong',
        data: err,
      });
    }
  }

  async checkGenerationStatus(requestId: string) {
    this.logger.log({ message: 'Sending response to check image status...' });

    const { data } = await lastValueFrom(
      this.http.get(
        this.fusionBrainUrl + 'key/api/v1/text2image/status/' + requestId,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
    );

    this.logger.log({ message: 'Response successfully sent' });

    this.logger.debug({
      message: 'Response successfully sent',
      data: { data },
    });

    switch (data['status']) {
      case 'INITIAL':
        return { message: 'Image initializing' };
      case 'DONE':
        await this.prepareImageData(requestId, data['images'][0]);

        return { message: 'Image successfully generated' };
      case 'PROCESSING':
        return { message: 'Image processing' };
      case 'FAIL':
        throw new BadRequestException({ message: 'Generation failed' });
    }
  }

  async prepareImageData(requestId: string, imageCode: string) {
    const thumbnailImageName = requestId + 'thumbnail.webp';

    const buffer = Buffer.from(imageCode, 'base64');

    const resizedBuffer = await sharp(buffer)
      .resize({ width: 128, height: 128 })
      .toBuffer();

    const image = await this.imageService.read(requestId);

    await this.minioService.uploadFile(
      this.bucketName,
      image.imageName,
      buffer,
    );

    await this.minioService.uploadFile(
      this.bucketName,
      thumbnailImageName,
      resizedBuffer,
    );

    const originalUrl = await this.minioService.getPresignedUrl(
      this.bucketName,
      image.imageName,
    );

    const thumbnailUrl = await this.minioService.getPresignedUrl(
      this.bucketName,
      thumbnailImageName,
    );

    await this.imageService.update({ originalUrl, thumbnailUrl }, requestId);

    return true;
  }
}
