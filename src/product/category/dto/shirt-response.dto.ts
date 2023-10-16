import { ApiProperty } from '@nestjs/swagger';
import { ImageResponseDto } from '../../../lib/image/dto';
import { CategoryResponseDto } from './category-response.dto';
import { ShirtStyles, ShirtFits } from '../interface/category.interface';

export class ShirtResponseDto {
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
  style: ShirtStyles;

  @ApiProperty({
    example: 'imageId',
  })
  image?: string | ImageResponseDto;

  @ApiProperty({
    example: 'Slim',
  })
  fit: ShirtFits;

  @ApiProperty({
    example: 'list of women clothes',
  })
  description: string;

  createdAt?: Date;
  updatedAt?: Date;
}
