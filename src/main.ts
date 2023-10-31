import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { SwaggerConfig } from '@config';
import { HttpExceptionFilter } from '@http/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.use(cookieParser());
  app.enableCors();
  app.enableVersioning({
    defaultVersion: AppModule.apiVersion,
    type: VersioningType.URI,
  });
  app.setGlobalPrefix('/api');
  SwaggerConfig(app, AppModule.apiVersion);
  await app.listen(AppModule.port);
  return AppModule.port;
}
bootstrap();
