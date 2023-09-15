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

  async uploadImages({
    files,
    type,
  }: {
    files: Express.Multer.File[];
    type: ImageTypes;
  }) {
    const images = [];
    try {
      for (const file of files) {
        const newImage = await this._upload(type, file);
        images.push(ImageMapper.toDto(newImage));
      }
      return images;
    } catch (e: any) {
      console.log('error ---', e);
      throw new BadRequestException('faild to upload variants image');
    }
  }

  async _upload(imageType: string, file: Express.Multer.File) {
    const { path, originalname, filename } = file;
    const res = await this.cloudinaryService.upload(path, {
      folder: `${imagesUploadPath.replace('{imageType}', imageType)}`,
      image_metadata: true,
    });
    const newImage = await this.imageModel.create({
      imageType,
      name: originalname,
      fileId: `${originalname}-${filename}`,
      url: res.url,
    });
    await unlinkFile(path);
    return newImage;
  }
}
