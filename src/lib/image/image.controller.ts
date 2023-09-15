import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { ImageUploadDto } from './dto/image-upload.dto';

@Controller('upload')
export class ImageController {
  constructor(private imageService: ImageService) {}
  @UseInterceptors(FilesInterceptor('file', 1))
  @Post('image')
  async uploadImage(
    @Body() imageUploadDto: ImageUploadDto,
    @UploadedFiles()
    files: Express.Multer.File[],
  ) {
    const { type } = imageUploadDto;
    return await this.imageService.uploadImages({
      files,
      type,
    });
  }

  @UseInterceptors(FilesInterceptor('files', 5))
  @Post('images')
  async uploadImages(
    @Body() imageUploadDto: ImageUploadDto,
    @UploadedFiles()
    files: Express.Multer.File[],
  ) {
    const { type } = imageUploadDto;
    return await this.imageService.uploadImages({
      files,
      type,
    });
  }
}
