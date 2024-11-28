import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

import { ImageFormatEnum } from './enum';

export class ImageFormatDto {
  @ApiProperty({ enum: ImageFormatEnum, default: ImageFormatEnum.THUMBNAIL })
  @IsEnum(ImageFormatEnum, { message: 'Incorrect enum value' })
  @IsNotEmpty()
  format: ImageFormatEnum;
}
