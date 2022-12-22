import { ApiProperty } from '@nestjs/swagger';
import { ICategory } from '@product/category/interface/category.interface';
import { createdCategory } from 'src/test/fixtures';

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
}
