import { Document } from 'mongoose';

export interface IVariant extends Document {
  imageUrls: string[];
  product: string;
  variantSize: string;
  color: string;
  sku: string;
}
