import { ApiProperty } from '@nestjs/swagger';

export class DatabaseResponseDataDto {
  @ApiProperty({ default: 'PrismaClientValidationError' })
  name: string;

  @ApiProperty({ default: '5.22.0' })
  clientVersion: string;
}
