import { IsString } from 'class-validator';

export class ImageUploadDto {
  @IsString()
  productName: string;
}
