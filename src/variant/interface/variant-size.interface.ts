import { Document } from 'mongoose';

export interface IVariantSize extends Document {
  price: number;
  size: string;
}
