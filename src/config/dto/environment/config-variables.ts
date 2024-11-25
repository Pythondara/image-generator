import { IsBoolean, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { ConfigVariablesDbProperty } from './config-variables-db-property';
import { ConfigVariablesMinioProperty } from './config-variables-minio-property';
import { ConfigVariablesFusionBrainProperty } from './config-variables-fusion-brain-property';

export class ConfigVariables {
  @IsString()
  host: string;

  @IsNumber()
  port: number;

  @IsString()
  swaggerFolder: string;

  @IsBoolean()
  logLevel: string;

  @ValidateNested()
  @Type(() => ConfigVariablesDbProperty)
  db: ConfigVariablesDbProperty;

  @ValidateNested()
  @Type(() => ConfigVariablesMinioProperty)
  minio: ConfigVariablesMinioProperty;

  @ValidateNested()
  @Type(() => ConfigVariablesFusionBrainProperty)
  fusionBrain: ConfigVariablesFusionBrainProperty;
}
