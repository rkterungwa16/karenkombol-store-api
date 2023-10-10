import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { MulterModule } from '@nestjs/platform-express';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Image, ImageSchema } from './schema/image.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessModule } from '@access/access.module';
import { UsersModule } from '@user/user.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    CloudinaryModule,
    AccessModule,
    UsersModule,
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
  ],
  exports: [
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
    ImageService,
  ],
  providers: [ImageService, CloudinaryService],
  controllers: [ImageController],
})
export class ImageModule {}
