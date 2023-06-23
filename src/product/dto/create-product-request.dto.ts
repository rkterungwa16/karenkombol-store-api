import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

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
  @IsOptional()
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
  @IsOptional()
  description: string;

  @ApiProperty({
    example: 'ACTIVE',
  })
  @IsOptional()
  status: ProductStatus;

  @ApiProperty({
    example: true,
  })
  @IsOptional()
  published: boolean;

  @ApiProperty({
    example: [],
  })
  @IsOptional()
  tags: string[];
}
