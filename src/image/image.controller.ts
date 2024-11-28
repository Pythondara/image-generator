import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ImageService } from './image.service';
import { ImageFormatDto, ImageFormatEnum, ImagePaginationDto } from './dto';
import { UuidDto } from '../dto/param/uuid.dto';

@ApiTags('Взаимодействие с изображением')
@Controller('image')
export class ImageController {
  constructor(private readonly service: ImageService) {}

  @ApiOperation({
    summary: 'Получение изображения по идентификатору изображения',
    description: 'Получение изображения по идентификатору изображения',
  })
  @ApiQuery({
    name: 'format',
    enum: ImageFormatEnum,
    required: true,
    description: 'Формат изображения',
  })
  @ApiParam({
    name: 'uuid',
    type: 'string',
    required: true,
    description: 'Уникальный идентификатор изображения',
  })
  @ApiResponse({ status: '2XX' })
  @Get('get/by/format/:uuid')
  async getOne(@Query() format: ImageFormatDto, @Param() paramDto: UuidDto) {
    return this.service.getOne(format, paramDto.uuid);
  }

  @ApiOperation({
    summary: 'Получение изображения по идентификатору изображения',
    description: 'Получение изображения по идентификатору изображения',
  })
  @ApiQuery({
    name: 'pagination',
    type: ImagePaginationDto,
    required: true,
    description: 'Пагинация',
  })
  @ApiResponse({ status: '2XX' })
  @Get('get/all')
  async getImage(@Query() pagination) {
    return this.service.getAll(pagination);
  }
}
