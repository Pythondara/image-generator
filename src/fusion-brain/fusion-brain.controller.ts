import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestParamsDto } from './dto';
import { FusionBrainService } from './fusion-brain.service';

@ApiTags('Генерация картинки')
@Controller('fusion-brain')
export class FusionBrainController {
  constructor(private readonly service: FusionBrainService) {}

  @ApiOperation({
    summary: 'Запрос на генерацию изображения',
    description: 'Запрос на генерацию изображения',
  })
  @Post('/generate')
  @ApiResponse({ status: '2XX' })
  async sendConsent(@Body() params: RequestParamsDto) {
    return this.service.generate(params);
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
