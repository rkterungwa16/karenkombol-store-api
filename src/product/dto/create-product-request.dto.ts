import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { ProductStatus } from '@product/interface/product.interface';
import { Transform } from 'class-transformer';
import { Image } from 'src/lib/image/schema/image.schema';
import { Clothing } from '@product/clothing/schema/clothing.schema';

export class CreateProductRequestDto {
  @ApiProperty({
    example: 'categoryId',
  })
  category: string | Clothing;

  @ApiProperty({
    example: 'image_id_1234',
  })
  @IsOptional()
  image?: string | Image;

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
