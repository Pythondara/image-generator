import { BadRequestException, Injectable, Logger } from '@nestjs/common';

import {
  CreateImageDto,
  ImageDto,
  ImageFormatDto,
  ImageFormatEnum,
  ImagePaginationDto,
  UpdateImageDto,
} from './dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class ImageService {
  private readonly logger = new Logger(ImageService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateImageDto): Promise<ImageDto> {
    this.logger.log({ message: 'Creating image...' });

    this.logger.debug({ message: 'Creating image', data: { dto } });

    const image = await this.prismaService.image.create({
      data: { imageName: dto.imageName, uuid: dto.uuid },
    });

    this.logger.log({ message: 'Image successfully created' });

    this.logger.debug({
      message: 'Image successfully created',
      data: { image },
    });

    return image;
  }

  async read(uuid: string): Promise<ImageDto> {
    this.logger.log({ message: 'Receiving image...' });

    const image = await this.prismaService.image.findUnique({
      where: {
        uuid,
      },
    });

    if (!image) {
      this.logger.error({
        message: 'Image does not exist',
      });

      throw new BadRequestException({ message: 'Image does not exist' });
    }

    this.logger.log({ message: 'Image successfully received' });

    this.logger.debug({
      message: 'Image successfully received',
      data: { image },
    });

    return image;
  }

  async update(dto: UpdateImageDto, uuid: string): Promise<ImageDto> {
    this.logger.log({ message: 'Updating image...' });

    this.logger.debug({ message: 'Updating image', data: { dto } });

    const image = await this.read(uuid);

    const updatedImage = await this.prismaService.image.update({
      data: dto,
      where: {
        uuid: image.uuid,
      },
    });

    this.logger.log({ message: 'Image successfully updated' });

    this.logger.debug({
      message: 'Image successfully updated',
      data: { image },
    });

    return updatedImage;
  }

  async getOne(params: ImageFormatDto, uuid: string) {
    this.logger.log({ message: 'Receiving image...', data: uuid });

    let isOriginalUrl: boolean;
    let isThumbnailUrl: boolean;

    if (params.format === ImageFormatEnum.ORIGINAL) {
      isOriginalUrl = true;
      isThumbnailUrl = false;
    } else {
      isOriginalUrl = false;
      isThumbnailUrl = true;
    }

    const image = await this.prismaService.image.findUnique({
      where: {
        uuid,
      },
      select: {
        originalUrl: isOriginalUrl,
        thumbnailUrl: isThumbnailUrl,
      },
    });

    this.logger.log({ message: 'Image successfully received', data: uuid });

    this.logger.debug({ message: 'Image successfully received', data: image });

    if (!image) {
      this.logger.error({ message: 'Image does not exist' });

      throw new BadRequestException('Image does not exist');
    }

    return image;
  }

  async getAll(query: ImagePaginationDto) {
    this.logger.log({ message: 'Receiving images...' });

    const skip = (query.offset - 1) * query.limit;

    const images = await this.prismaService.image.findMany({
      take: +query.limit,
      skip,
      select: {
        uuid: true,
        originalUrl: true,
        thumbnailUrl: true,
        imageName: true,
      },
    });

    this.logger.log({ message: 'Image successfully received' });

    this.logger.debug({ message: 'Image successfully received', data: images });

    return images;
  }
}
