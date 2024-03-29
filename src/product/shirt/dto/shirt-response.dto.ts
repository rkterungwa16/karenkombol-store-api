import { ApiProperty } from '@nestjs/swagger';
import { ImageResponseDto } from '../../../lib/image/dto';
import { ShirtFits } from '@product/interface/shirt.interface';
import { ClothingResponseDto } from '@product/clothing/dto';
import { ShirtStyleResponseDto } from './shirt-style-response.dto';

export class ShirtResponseDto {
  @ApiProperty({
    example: 'shirt_id',
  })
  id: string;

  @ApiProperty({
    example: 'custom tunic shirt',
  })
  name: string;

  @ApiProperty({
    example: 'clothingId',
  })
  clothing: string | ClothingResponseDto;

  @ApiProperty({
    example: 'Tunic',
  })
  style: string | ShirtStyleResponseDto;

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
