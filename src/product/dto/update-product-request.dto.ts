import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { ProductStatus } from '@product/interface/product.interface';

export class UpdateProductRequestDto {
  @ApiProperty({
    example: 'imgurl',
  })
  @IsOptional()
  imageUrl: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'v-neck short-sleeve shirt',
  })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'beautiful design for short sleeve shirt',
  })
  description: string;

  @IsOptional()
  @ApiProperty({
    example: 'ACTIVE',
  })
  status: ProductStatus;

  @IsOptional()
  @ApiProperty({
    example: true,
  })
  published: boolean;

  @IsOptional()
  @ApiProperty({
    example: [],
  })
  tags: string[];
}
