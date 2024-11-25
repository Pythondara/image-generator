import { IsString } from 'class-validator';

export class ConfigVariablesFusionBrainProperty {
  @IsString()
  url: string;

  @IsString()
  apiKey: string;

  @IsString()
  secretKey: string;
}
