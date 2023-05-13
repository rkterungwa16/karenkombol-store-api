import { IsString } from 'class-validator';

export class ImageUploadDto {
  @IsString()
  name: string;
}
