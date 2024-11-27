import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength } from 'class-validator';

export class GenerateParamsDto {
  @ApiProperty({ default: 'Bird' })
  @MaxLength(1000, { message: 'Max length reached: 1000' })
  @MinLength(3, { message: 'You should to spell at least 3 character' })
  query: string;
}
