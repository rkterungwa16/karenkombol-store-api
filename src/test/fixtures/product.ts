import { IProduct, ProductStatus } from '@product/interface/product.interface';
import { createdCategory } from './';

export const createProduct: IProduct = {
  _id: 'product_12345',
  category: createdCategory,
  imageUrl: 'product_image_url',
  name: 'product_name',
  description: 'product_description',
  published: true,
  status: ProductStatus.Active,
  tags: [],
};
