import { ApiProperty } from '@nestjs/swagger';
import { ProductStatus } from '@product/interface/product.interface';
import { createdCategory } from '../../test/fixtures';
import { ClothingResponseDto } from '@product/clothing/dto';
import { ImageResponseDto } from 'src/lib/image/dto';

export class ProductResponseDto {
  @ApiProperty({
    example: 'productId',
  })
  id: string;

  @ApiProperty({
    example: createdCategory,
  })
  category: string | ClothingResponseDto;

  @ApiProperty({
    example: 'img_id_1234',
  })
  image: string | ImageResponseDto;

  @ApiProperty({
    example: 'women',
  })
  name: string;

  @ApiProperty({
    example: 'list of women clothes',
  })
  description: string;

  @ApiProperty({
    example: 'ACTIVE',
  })
  status: ProductStatus;

  @ApiProperty({
    example: true,
  })
  published: boolean;

  @ApiProperty({
    example: [],
  })
  tags: string[];

  createdAt?: Date;
  updatedAt?: Date;
}
