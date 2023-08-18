import { IColor } from '@color/interface/color.interface';
import { IProduct } from './product.interface';

export type IProductColor = {
  color: string | IColor;
  product: string | IProduct;
  createdAt?: Date;
  updatedAt?: Date;
};
