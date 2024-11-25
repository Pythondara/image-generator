import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ConfigVariablesDbProperty {
  @IsString()
  host: string;

  @IsNumber()
  port: number;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty()
  databaseUrl: string;
}
