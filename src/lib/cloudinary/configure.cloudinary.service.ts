import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import * as cloudinary from 'cloudinary';
import { CloudinaryModule } from './cloudinary.module';
import { CloudinaryConstants } from './enums';

export const ConfigureCloudinary = (configService: ConfigService) => {
  const cloudinaryV2 = cloudinary.v2;
  cloudinaryV2.config({
    cloud_name: configService.get<string>('CLOUDINARY_CLOUD_NAME'),
    api_key: configService.get<string>('CLOUDINARY_API_KEY'),
    api_secret: configService.get<string>('CLOUDINARY_API_SECRET'),
  });
  return cloudinaryV2;
};

export const ConfigureCloudinaryService: DynamicModule = {
  module: CloudinaryModule,
  imports: [ConfigModule],
  providers: [
    {
      provide: CloudinaryConstants.PROVIDER_NAME,
      useFactory: ConfigureCloudinary,
    },
  ],
};

@Module({})
export class ConfigureCloudinaryModule {
  static register(): DynamicModule {
    return {
      module: ConfigureCloudinaryModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: CloudinaryConstants.PROVIDER_NAME,
          useFactory: ConfigureCloudinary,
        },
      ],
    };
  }
}
