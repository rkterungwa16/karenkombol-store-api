import { Module } from '@nestjs/common';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [CloudinaryModule, ImageModule],
  exports: [CloudinaryModule, ImageModule],
})
export class LibModule {}
