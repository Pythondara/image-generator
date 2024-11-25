import { GenerateParamsDto } from './generate-params.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, Max, ValidateNested } from 'class-validator';

export class RequestParamsDto {
  @ApiProperty()
  type: 'GENERATE';

  @ApiProperty()
  style: string;

  @ApiProperty({ default: 128 })
  @Max(1024)
  width: number;

  @ApiProperty({ default: 128 })
  @Max(1024)
  height: number;

  @ApiProperty({ default: 1 })
  @Max(1)
  num_images: number;

  @ApiProperty({ required: false })
  @IsOptional()
  negativePromptUnclip?: string;

  @ApiProperty()
  @Type(() => GenerateParamsDto)
  @ValidateNested()
  generateParams: GenerateParamsDto;
}
