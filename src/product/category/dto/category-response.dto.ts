import { ApiProperty } from '@nestjs/swagger';
import { ShirtResponseDto } from './shirt-response.dto';
import { ClothingTypes } from '../interface/category.interface';

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
    example: 'shirtId',
  })
  shirts?: (string | ShirtResponseDto)[];

  createdAt?: Date;
  updatedAt?: Date;
}
