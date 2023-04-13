import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { ProductStatus } from '@product/interface/product.interface';

export class UpdateProductRequestDto {
  @ApiProperty({
    example: 'imgurl',
  })
  imageUrl: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'v-neck short-sleeve shirt',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'beautiful design for short sleeve shirt',
  })
  description: string;

  @ApiProperty({
    example: 'ACTIVE',
  })
  status: ProductStatus;

  @ApiProperty({
    example: true,
  })
  published: boolean;

  @ApiProperty({
    example: [],
  })
  tags: string[];
}
