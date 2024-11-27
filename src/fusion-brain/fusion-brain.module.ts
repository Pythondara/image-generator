import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { FusionBrainService } from './fusion-brain.service';
import { FusionBrainController } from './fusion-brain.controller';

@Module({
  providers: [FusionBrainService],
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        headers: {
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
