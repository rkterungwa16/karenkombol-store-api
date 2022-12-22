import { Module } from '@nestjs/common';
import { ConfigureCloudinaryModule } from './configure.cloudinary.service';

@Module({
  imports: [ConfigureCloudinaryModule.register()],
  exports: [ConfigureCloudinaryModule.register()],
})
export class CloudinaryModule {}
