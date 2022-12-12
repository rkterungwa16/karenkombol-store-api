import { IVariant } from '@product/variant/interface/variant.interface';
import { createdColor } from './color';

export const createdVariant: IVariant = {
  _id: 'variant_12345',
  imageUrls: ['img1', 'img2'],
  color: createdColor,
  product: 'product_12345',
  variantSize: 'variant_size_12345',
  sku: 'PRODUCT_1234',
};
