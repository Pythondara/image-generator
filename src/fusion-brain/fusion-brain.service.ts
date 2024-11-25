import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, lastValueFrom, timer } from 'rxjs';

import { ConfigVariables } from '../config';
import { RequestParamsDto, HeadersDto } from './dto';

@Injectable()
export class FusionBrainService {
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService<ConfigVariables, true>,
  ) {}
  async generate(params: RequestParamsDto) {
    const headers = {
      'X-Key': `Key ${this.config.get('fusionBrain.apiKey', { infer: true })}`,
      'X-Secret': `Secret ${this.config.get('fusionBrain.secretKey', { infer: true })}`,
    } as any;

    const x = await this.getModel(headers);

    try {
      const { data } = await firstValueFrom(
        this.http.post(
          this.config.get('fusionBrain.url', { infer: true }) +
            'key/api/v1/text2image/run',
          { params, model_id: x },
          { headers },
        ),
      );

      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async getModel(headers) {
    try {
      const { data } = await lastValueFrom(
        this.http.get(
          this.config.get('fusionBrain.url', { infer: true }) +
            'key/api/v1/models',
          { headers },
        ),
      );

      return data[0].id;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async checkGenerationStatus(requestId: string, attempts = 10, delay = 1000) {
    // const headers = {
    //   'X-Key': `Key ${this.config.get('fusionBrain.apiKey', { infer: true })}`,
    //   'X-Secret': `Secret ${this.config.get('fusionBrain.secretKey', { infer: true })}`,
    // } as any;

    while (attempts >= 0) {
      const { data } = await lastValueFrom(
        this.http.get(
          this.config.get('fusionBrain.url', { infer: true }) +
            'key/api/v1/text2image/status/' +
            requestId,
        ),
      );

      if (data['status'] === 'DONE') {
        return data['images'];
      }

      attempts -= 1;
      await lastValueFrom(timer(delay));
    }

    throw new BadRequestException('Maximum attempts reached');
  }
}
