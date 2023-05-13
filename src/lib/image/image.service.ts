import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Image } from './schema/image.schema';
import { ImageTypes, imagesUploadPath } from './constants';
import { unlinkFile } from './utils';
import { ImageMapper } from './image.mapper';

@Injectable()
export class ImageService {
  constructor(
    private cloudinaryService: CloudinaryService,
    @InjectModel(Image.name) private readonly imageModel: Model<Image>,
  ) {}

  async uploadProductImage({
    file,
    productName,
  }: {
    file: Express.Multer.File;
    productName: string;
  }) {
    const { path, originalname, filename } = file;
    try {
      const res = await this.cloudinaryService.upload(path, {
        folder: `${imagesUploadPath.replace(
          '{imageType}',
          ImageTypes.PRODUCT,
        )}`,
        image_metadata: true,
      });
      const newImage = await this.imageModel.create({
        imageType: ImageTypes.PRODUCT,
        name: productName,
        fileId: `${productName}-${originalname}-${filename}`,
        url: res.url,
      });
      await unlinkFile(path);
      return ImageMapper.toDto(newImage);
    } catch (e: any) {
      throw new BadRequestException('faild to upload document');
    }
  }
}
