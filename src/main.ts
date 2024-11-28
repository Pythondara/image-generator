import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import Logger from './utils/logger';
import config from './config/config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

ConfigModule.forRoot({
  load: [config],
});

const envConfig = config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const logsFolder = join(__dirname, '../logs');

  app.useLogger(Logger(logsFolder));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Image service documentation')
    .setDescription('Methods for interacting with an image service')
    .setVersion('1.0')
    .addTag('')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/swagger', app, document);

  await app.listen(envConfig.port, envConfig.host);
}
bootstrap();
