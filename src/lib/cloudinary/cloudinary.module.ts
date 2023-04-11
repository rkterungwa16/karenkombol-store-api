import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { ConfigureCloudinaryModule } from './configure.cloudinary.service';

@Module({
  imports: [ConfigureCloudinaryModule.register()],
  exports: [ConfigureCloudinaryModule.register()],
  // Register CloudinaryService, ConfigCloudinaryService and ConfigService
  // ConfigService will be used by ConfigCloudinaryService.
  // ConfigCloudinaryService will be used by CloudinaryService.
  providers: [
    CloudinaryService,
    ...ConfigureCloudinaryModule.register().providers,
  ],
})
export class CloudinaryModule {}
