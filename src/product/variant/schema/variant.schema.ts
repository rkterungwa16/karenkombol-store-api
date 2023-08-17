import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Variant extends Document {
  @Prop({ type: [String] })
  imageUrls?: string[];

  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product: string;

  @Prop({ type: Types.ObjectId, ref: 'ProductSize', required: true })
  productSize: string;

  @Prop({ type: Types.ObjectId, ref: 'ProductColor', required: true })
  productColor: string;

  @Prop({ type: String })
  sku: string;

  @Prop({ type: Number, default: 0 })
  stock?: number;

  @Prop({ type: Number, required: true })
  price: number;
}

export const VariantSchema = SchemaFactory.createForClass(Variant);
