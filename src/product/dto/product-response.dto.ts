import { ApiProperty } from '@nestjs/swagger';
import { ICategory } from '@product/category/interface/category.interface';
import { ProductStatus } from '@product/interface/product.interface';
import { createdCategory } from '../../test/fixtures';

export class ProductResponseDto {
  @ApiProperty({
    example: 'productId',
  })
  id: string;

  @ApiProperty({
    example: createdCategory,
  })
  category: ICategory;

  @ApiProperty({
    example: 'imgurl',
  })
  imageUrl: string;

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
}
