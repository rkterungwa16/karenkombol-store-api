import { ApiProperty } from '@nestjs/swagger';
import { IProductColor } from '@product/interface/product-color.interface';
import { IProductSize } from '@product/interface/product-size.interface';
import { IProduct } from '@product/interface/product.interface';

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
    example: {
      id: 'product__1234',
    },
  })
  product: IProduct;

  @ApiProperty({
    example: {
      id: 'productSizeId',
    },
  })
  productSize: IProductSize;

  @ApiProperty({
    example: 'colorId',
  })
  productColor: IProductColor;

  @ApiProperty({
    example: 'sku',
  })
  sku: string;
  createdAt?: Date;
  updatedAt?: Date;
}
