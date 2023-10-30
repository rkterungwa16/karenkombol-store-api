import { ApiProperty } from '@nestjs/swagger';
import { ImageResponseDto } from '../../../lib/image/dto';
import { ShirtFits, ShirtStyles } from '@product/interface/shirt.interface';

export class ShirtResponseDto {
  @ApiProperty({
    example: 'shirtId',
  })
  id: string;

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
