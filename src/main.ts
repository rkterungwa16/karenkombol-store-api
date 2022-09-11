import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfig } from '@config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerConfig(app, AppModule.apiVersion);
  await app.listen(AppModule.port);
  return AppModule.port;
}
bootstrap();
