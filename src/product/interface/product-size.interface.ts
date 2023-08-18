import { ISize } from '@size/interface/size.interface';
import { IProduct } from './product.interface';

export type IProductSize = {
  size: string | ISize;
  product: string | IProduct;
  createdAt?: Date;
  updatedAt?: Date;
};
