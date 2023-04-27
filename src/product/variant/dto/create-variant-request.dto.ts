import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Optional } from '@nestjs/common';

export class CreateVariantRequestDto {
  @ApiProperty({
    example: ['img1', 'img2'],
  })
  @Optional()
  @ValidateNested({ each: true })
  imageUrls?: string[];

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'productId',
  })
  product: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'sizeId',
  })
  size: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'colorId',
  })
  color: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'sku',
  })
  sku: string;
}
