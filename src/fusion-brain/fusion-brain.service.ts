import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

import { ConfigVariables } from '../config';
import { RequestParamsDto } from './dto';

@Injectable()
export class FusionBrainService {
  private readonly logger = new Logger(FusionBrainService.name);
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService<ConfigVariables, true>,
  ) {}
  async generate(dto: RequestParamsDto, modelId = '4') {
    const apiKey = `Key ${this.config.get('fusionBrain.apiKey', { infer: true })}`;
    const secretKey = `Secret ${this.config.get('fusionBrain.secretKey', { infer: true })}`;

    const url =
      this.config.get('fusionBrain.url', { infer: true }) +
      'key/api/v1/text2image/run';

    const formattedUrl = new URL(url).toString();

    try {
      this.logger.log({ message: 'Sending response...' });

      const json = JSON.stringify(dto);

      const blob = new Blob([json], {
        type: 'application/json',
      });

      const formData = new FormData();
      formData.append('params', blob);
      formData.append('model_id', modelId);

      const { data } = await lastValueFrom(
        this.http.post(formattedUrl, formData, {
          headers: {
            'X-Key': apiKey,
            'X-Secret': secretKey,
            'Content-Type': 'multipart/form-data',
          },
        }),
      );

      this.logger.log({ message: 'Response successfully sent' });

      this.logger.debug({
        message: 'Response successfully sent',
        data: { data },
      });

      return data;
    } catch (e) {
      this.logger.error({ message: 'Something went wrong', data: { e } });
      throw new BadRequestException(e);
    }
  }

  async getModel() {
    try {
      const { data } = await lastValueFrom(
        this.http.get(
          this.config.get('fusionBrain.url', { infer: true }) +
            'key/api/v1/models',
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        ),
      );

      return data[0].id;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async checkGenerationStatus(requestId: string) {
    const { data } = await lastValueFrom(
      this.http.get(
        this.config.get('fusionBrain.url', { infer: true }) +
          'key/api/v1/text2image/status/' +
          requestId,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Key': `Key ${this.config.get('fusionBrain.apiKey', { infer: true })}`,
            'X-Secret': `Secret ${this.config.get('fusionBrain.secretKey', { infer: true })}`,
          },
        },
      ),
    );

    switch (data['status']) {
      case 'INITIAL':
        return { message: 'Image initializing' };
      case 'DONE':
        return data['images'];
      case 'PROCESSING':
        return { message: 'Image processing' };
      case 'FAIL':
        throw new BadRequestException('Generation failed');
    }
  }
}
