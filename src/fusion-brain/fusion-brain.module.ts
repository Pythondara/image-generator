import { Module } from '@nestjs/common';
import { HttpModule, HttpModuleAsyncOptions } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { FusionBrainService } from './fusion-brain.service';
import { FusionBrainController } from './fusion-brain.controller';

@Module({
  providers: [FusionBrainService],
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        timeout: 7000,
        maxRedirects: 5,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [FusionBrainController],
})
export class FusionBrainModule {}
