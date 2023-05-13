import { ApiProperty } from '@nestjs/swagger';
import { ImageTypes } from '../constants';

export class ImageResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({
    example: 'product_image',
  })
  name: string;

  @ApiProperty({
    example: 'product_img_1223',
  })
  fileId: string;

  @ApiProperty({
    example: 'imageUrl',
  })
  url: string;

  @ApiProperty({
    example: 'products',
  })
  imageType?: ImageTypes;

  createdAt?: Date;

  updatedAt?: Date;
}
