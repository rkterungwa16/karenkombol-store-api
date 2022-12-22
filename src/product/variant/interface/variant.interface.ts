import { Document } from 'mongoose';
import { IColor } from '@color/interface/color.interface';

export interface IVariant {
  _id: string;
  imageUrls: string[];
  product: string;
  variantSize: string;
  color: IColor;
  sku: string;
}
