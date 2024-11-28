import { ApiProperty } from '@nestjs/swagger';
import { Max, Min } from 'class-validator';

export class ImagePaginationDto {
  @ApiProperty({ default: 1 })
  @Min(1)
  offset: number;

  @ApiProperty({ default: 10 })
  @Min(1)
  @Max(50)
  limit: number;
}
