import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateImageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  imageName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  uuid: string;
}
