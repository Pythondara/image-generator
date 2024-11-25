import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import config from './config/config';
import { MinioModule } from './minio/minio.module';
import { MinioService } from './minio/minio.service';
import { FusionBrainModule } from './fusion-brain/fusion-brain.module';
import { FusionBrainService } from './fusion-brain/fusion-brain.service';

ConfigModule.forRoot({
  load: [config],
});

@Module({
  imports: [
    MinioModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    FusionBrainModule,
    HttpModule,
  ],
  controllers: [],
  providers: [MinioService, FusionBrainService],
})
export class AppModule {}
