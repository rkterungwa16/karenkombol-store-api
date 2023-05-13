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

@Controller('image')
export class ImageController {
  constructor(private imageService: ImageService) {}
  @UseInterceptors(FilesInterceptor('file', 1))
  @Post('upload/product')
  async uploadProduct(
    @Body() imageUploadDto: ImageUploadDto,
    @UploadedFiles()
    files: Express.Multer.File[],
  ) {
    const { name } = imageUploadDto;
    return await this.imageService.uploadProductImage({
      file: files[0],
      name,
    });
  }

  @UseInterceptors(FilesInterceptor('file', 1))
  @Post('upload/category')
  async uploadCategory(
    @Body() imageUploadDto: ImageUploadDto,
    @UploadedFiles()
    files: Express.Multer.File[],
  ) {
    const { name } = imageUploadDto;
    return await this.imageService.uploadCategoryImage({
      file: files[0],
      name,
    });
  }

  @UseInterceptors(FilesInterceptor('files', 5))
  @Post('upload/variants')
  async uploadVariants(
    @Body() imageUploadDto: ImageUploadDto,
    @UploadedFiles()
    files: Express.Multer.File[],
  ) {
    const { name } = imageUploadDto;
    return await this.imageService.uploadVariantsImages({
      files,
      name,
    });
  }
}
