import { ApiProperty } from '@nestjs/swagger';
import { ClothingTypes } from '../interface/category.interface';
import { ShirtResponseDto } from '@product/shirt/dto';

export class CategoryResponseDto {
  @ApiProperty({
    example: 'categoryId',
  })
  id: string;
  @ApiProperty({
    example: 'clothingId',
  })
  name: ClothingTypes;

  @ApiProperty({
    example: 'shirt description',
  })
  description?: string;

  @ApiProperty({
    example: 'shirtId',
  })
  shirts?: (string | ShirtResponseDto)[];

  createdAt?: Date;
  updatedAt?: Date;
}
