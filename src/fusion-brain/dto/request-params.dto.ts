import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsOptional,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

import { GenerateParamsDto } from './generate-params.dto';
import { StyleEnum, TypeEnum } from './enum';

export class RequestParamsDto {
  @ApiProperty({ enum: TypeEnum })
  @IsOptional()
  @IsEnum(TypeEnum, { message: 'Incorrect enum value' })
  type: TypeEnum;

  @ApiProperty({ enum: StyleEnum })
  @IsOptional()
  @IsEnum(StyleEnum, { message: 'Incorrect enum value' })
  style: StyleEnum;

  @ApiProperty({ default: 128 })
  @IsOptional()
  @Max(1024, { message: 'Out of maximum value' })
  @Min(128, { message: 'Out of minimum value' })
  width: number;

  @ApiProperty({ default: 128 })
  @IsOptional()
  @Max(1024, { message: 'Out of maximum value' })
  @Min(128, { message: 'Out of minimum value' })
  height: number;

  @ApiProperty({ default: 1 })
  @IsOptional()
  @Max(1, { message: 'You can use only 1 as value' })
  @Min(1, { message: 'You can use only 1 as value' })
  num_images: number;

  @ApiProperty({ required: false, default: '' })
  @IsOptional()
  @MaxLength(1000, { message: 'Max length reached: 1000' })
  negativePromptUnclip?: string;

  @ApiProperty()
  @Type(() => GenerateParamsDto)
  @IsOptional()
  @ValidateNested()
  generateParams: GenerateParamsDto;
}
