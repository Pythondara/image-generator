import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateImageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  originalUrl?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  thumbnailUrl?: string;
}
