import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { FusionBrainService } from './fusion-brain.service';
import { FusionBrainController } from './fusion-brain.controller';
import { MinioService } from '../minio/minio.service';
import { ImageService } from '../image/image.service';
import { PrismaService } from '../database/prisma.service';

@Module({
  providers: [FusionBrainService, MinioService, ImageService, PrismaService],
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        headers: {
          'X-Key': `Key ${config.get('fusionBrain.apiKey', { infer: true })}`,
          'X-Secret': `Secret ${config.get('fusionBrain.secretKey', { infer: true })}`,
          'Content-Type': 'multipart/form-data',
        },
        timeout: 7000,
        maxRedirects: 5,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [FusionBrainController],
})
export class FusionBrainModule {}
