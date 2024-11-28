import { DatabaseResponseDataDto } from './database-response-data.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';

export class DatabaseResponseDto {
  @ApiProperty({ default: 'Error received while creating image' })
  message: string;

  @ApiProperty()
  @ValidateNested()
  data: DatabaseResponseDataDto;
}
