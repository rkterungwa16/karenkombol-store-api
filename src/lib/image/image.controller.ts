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
  async uploadFiles(
    @Body() imageUploadDto: ImageUploadDto,
    @UploadedFiles()
    files: Express.Multer.File[],
  ) {
    const { productName } = imageUploadDto;
    return await this.imageService.uploadProductImage({
      file: files[0],
      productName,
    });
  }
}
