import { IsEnum } from 'class-validator';
import { ImageTypes } from '../constants';

export class ImageUploadDto {
  @IsEnum(ImageTypes)
  type: ImageTypes;
}
