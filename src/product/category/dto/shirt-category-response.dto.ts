import { ApiProperty } from '@nestjs/swagger';
import { ImageResponseDto } from '../../../lib/image/dto';
import { CategoryResponseDto } from './category-response.dto';
import {
  ShirtCategoryStyles,
  ShirtCategoryFit,
} from '../interface/category.interface';

export class ShirtCategoryResponseDto {
  @ApiProperty({
    example: 'shirtCategoryId',
  })
  id: string;

  @ApiProperty({
    example: 'categoryId',
  })
  category: string | CategoryResponseDto;

  @ApiProperty({
    example: 'Tunic',
  })
  style: ShirtCategoryStyles;

  @ApiProperty({
    example: 'imageId',
  })
  image?: string | ImageResponseDto;

  @ApiProperty({
    example: 'Slim',
  })
  fit: ShirtCategoryFit;

  @ApiProperty({
    example: 'list of women clothes',
  })
  description: string;

  createdAt?: Date;
  updatedAt?: Date;
}
