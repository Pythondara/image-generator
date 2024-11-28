import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GenerateImageParamsDto, GenerateImageQueryDto } from './dto';
import { FusionBrainService } from './fusion-brain.service';

@ApiTags('Генерация изображения')
@Controller('fusion-brain')
export class FusionBrainController {
  constructor(private readonly service: FusionBrainService) {}

  @ApiOperation({
    summary: 'Генерация изображения',
    description: 'Генерация изображения',
  })
  @Post('/generate/:style')
  @ApiParam({
    name: 'style',
    type: 'string',
    required: true,
    description: 'Стиль генерируемого изображения',
  })
  @ApiQuery({
    name: 'prompt',
    type: 'string',
    required: true,
    description: 'Промпт для генерации изображения',
  })
  @ApiResponse({ status: '2XX' })
  async generate(
    @Query() prompt: GenerateImageQueryDto,
    @Param() style: GenerateImageParamsDto,
  ) {
    return this.service.generate(prompt, style);
  }

  @ApiOperation({
    summary: 'Получение статуса генерации изображения',
    description: 'Получение статуса генерации изображения',
  })
  @Get('/check/status/:requestId')
  @ApiParam({
    name: 'requestId',
    type: 'string',
    required: true,
  })
  @ApiResponse({ status: '2XX' })
  async checkGenerationStatus(@Param('requestId') requestId: string) {
    return this.service.checkGenerationStatus(requestId);
  }
}
