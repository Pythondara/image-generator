import { ApiProperty } from '@nestjs/swagger';

export class GenerateParamsDto {
  @ApiProperty()
  query: string;
}
