import { Module } from '@nestjs/common';
import { ConfigureCloudinaryModule } from './configure.cloudinary.service';

@Module({
  imports: [ConfigureCloudinaryModule],
  exports: [ConfigureCloudinaryModule],
})
export class CloudinaryModule {}
