import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateImageResponse {
  @IsString()
  @IsNotEmpty()
  uuid: string;
}
