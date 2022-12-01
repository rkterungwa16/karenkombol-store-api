import { Document } from 'mongoose';
import { IColor } from 'src/color/interface/color.interface';

export interface IVariant extends Document {
  imageUrls: string[];
  product: string;
  variantSize: string;
  color: IColor;
  sku: string;
}
