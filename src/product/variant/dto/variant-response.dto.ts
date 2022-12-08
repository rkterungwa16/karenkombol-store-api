import { ApiProperty } from '@nestjs/swagger';

export class VariantResponsetDto {
  @ApiProperty({
    example: 'variantId',
  })
  id: string;
  @ApiProperty({
    example: ['img1', 'img2'],
  })
  imageUrls: string[];

  @ApiProperty({
    example: 'productId',
  })
  product: string;

  @ApiProperty({
    example: 'variantSizeId',
  })
  variantSize: string;

  @ApiProperty({
    example: 'colorId',
  })
  color: string;

  @ApiProperty({
    example: 'sku',
  })
  sku: string;
}
