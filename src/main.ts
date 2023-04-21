import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { SwaggerConfig } from '@config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.use(cookieParser());
  app.enableCors();
  SwaggerConfig(app, AppModule.apiVersion);
  await app.listen(AppModule.port);
  return AppModule.port;
}
bootstrap();
