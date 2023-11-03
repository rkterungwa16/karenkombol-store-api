import { ApiProperty } from '@nestjs/swagger';
import { ShirtStyles } from '@product/interface/shirt.interface';

export class ShirtStyleResponseDto {
  @ApiProperty({
    example: 'shirt-style_id',
  })
  id: string;

  @ApiProperty({
    example: 'long sleeve shirt with loose fit',
  })
  description: string;

  @ApiProperty({
    example: 'Tunic',
  })
  name: string | ShirtStyles;

  createdAt?: Date;
  updatedAt?: Date;
}
