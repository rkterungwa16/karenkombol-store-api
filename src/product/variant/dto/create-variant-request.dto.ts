import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateVariantRequestDto {
  @ApiProperty({
    example: ['img1', 'img2'],
  })
  imageUrls: string[];

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'productId',
  })
  product: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'variantSizeId',
  })
  variantSize: string;

  @IsString()
  @ApiProperty({
    example: 'colorId',
  })
  color: string;

  @IsString()
  @ApiProperty({
    example: 'sku',
  })
  sku: string;
}
