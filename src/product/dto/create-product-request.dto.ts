import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { ProductStatus } from '@product/interface/product.interface';
import { Transform } from 'class-transformer';

export class CreateProductRequestDto {
  @ApiProperty({
    example: 'categoryId',
  })
  category: string;

  @ApiProperty({
    example: 'imgurl',
  })
  imageUrl: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'v-neck short-sleeve shirt',
  })
  @Transform(({ value }) => value.toLowerCase())
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
