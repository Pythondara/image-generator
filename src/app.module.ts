import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import config from './config/config';
import { MinioModule } from './minio/minio.module';
import { MinioService } from './minio/minio.service';
import { FusionBrainModule } from './fusion-brain/fusion-brain.module';
import { FusionBrainService } from './fusion-brain/fusion-brain.service';
import { ImageModule } from './image/image.module';
import { DatabaseModule } from './database/database.module';
import { PrismaService } from './database/prisma.service';

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
    ImageModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [MinioService, FusionBrainService, PrismaService],
})
export class AppModule {}
