import { ApiProperty } from '@nestjs/swagger';
import { CategoryTypeResponseDto } from './category-type-response.dto';
import { ShirtCategoryResponseDto } from './shirt-category-response.dto';

export class CategoryResponseDto {
  @ApiProperty({
    example: 'categoryId',
  })
  id: string;
  @ApiProperty({
    example: 'categoryTypeId',
  })
  categoryType: string | CategoryTypeResponseDto;

  @ApiProperty({
    example: '[shirtCategoryId]',
  })
  shirts?: (string | ShirtCategoryResponseDto)[];

  createdAt?: Date;
  updatedAt?: Date;
}
