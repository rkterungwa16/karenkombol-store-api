import { ApiProperty } from '@nestjs/swagger';
import { ClothingResponseDto } from './clothing-response.dto';
import { ShirtResponseDto } from './shirt-response.dto';

export class CategoryResponseDto {
  @ApiProperty({
    example: 'categoryId',
  })
  id: string;
  @ApiProperty({
    example: 'clothingId',
  })
  clothing: string | ClothingResponseDto;

  @ApiProperty({
    example: '[shirtId]',
  })
  shirts?: (string | ShirtResponseDto)[];

  createdAt?: Date;
  updatedAt?: Date;
}
