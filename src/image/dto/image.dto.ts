import { ApiProperty } from '@nestjs/swagger';

export class ImageDto {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  imageName: string;

  @ApiProperty()
  originalUrl?: string;

  @ApiProperty()
  thumbnailUrl?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
