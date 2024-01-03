import { ApiProperty } from '@nestjs/swagger';
import { ClothingTypes } from '../interface/clothing.interface';
import { ShirtResponseDto } from '@product/shirt/dto';

export class ClothingResponseDto {
  @ApiProperty({
    example: 'categoryId',
  })
  id: string;
  @ApiProperty({
    example: 'clothingId',
  })
  name: string | ClothingTypes;

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
