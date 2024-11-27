import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestParamsDto, StyleEnum } from './dto';
import { FusionBrainService } from './fusion-brain.service';

@ApiTags('Генерация картинки')
@Controller('fusion-brain')
export class FusionBrainController {
  constructor(private readonly service: FusionBrainService) {}

  @ApiOperation({
    summary: 'Запрос на генерацию изображения',
    description: 'Запрос на генерацию изображения',
  })
  @Post('/generate/:style')
  @ApiParam({
    name: 'style',
    enum: StyleEnum,
  })
  @ApiResponse({ status: '2XX' })
  async sendConsent(@Body() dto: RequestParamsDto, @Param() style: string) {
    return this.service.generate(dto, style);
  }

  @ApiOperation({
    summary: 'Запрос на генерацию изображения',
    description: 'Запрос на генерацию изображения',
  })
  @Get('/check/status/:requestId')
  @ApiParam({
    name: 'requestId',
    type: 'string',
  })
  @ApiResponse({ status: '2XX' })
  async checkGenerationStatus(@Param('requestId') requestId: string) {
    return this.service.checkGenerationStatus(requestId);
  }
}
