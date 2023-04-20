import { DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cloudinary from 'cloudinary';
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

export class ConfigureCloudinaryModule {
  static register(): DynamicModule {
    return {
      module: ConfigureCloudinaryModule,
      // Register ConfigService will be injected into or used by ConfigureCloudinary.
      // When using ConfigCloudinary, the factory is returned.
      providers: [
        ConfigService,
        {
          provide: CloudinaryConstants.PROVIDER_NAME,
          useFactory: ConfigureCloudinary,
          inject: [ConfigService],
        },
      ],
    };
  }
}
