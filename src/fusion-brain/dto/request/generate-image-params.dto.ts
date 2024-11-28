import { StyleEnum } from '../enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class GenerateImageParamsDto {
  @ApiProperty({ enum: StyleEnum, default: StyleEnum.DEFAULT })
  @IsEnum(StyleEnum, { message: 'Incorrect enum value' })
  @IsNotEmpty()
  style: StyleEnum;
}
