import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

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
  productSize: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'colorId',
  })
  productColor: string;

  // @IsNotEmpty()
  // @IsString()
  // @ApiProperty({
  //   example: 'sku',
  // })
  // sku: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 'sku',
  })
  price: number;
}
