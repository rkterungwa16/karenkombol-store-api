import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Variant extends Document {
  @Prop({ type: [String] })
  imageUrls: string[];

  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product: string;

  @Prop({ type: Types.ObjectId, ref: 'VariantSize', required: true })
  variantSize: string;

  @Prop({ type: Types.ObjectId, ref: 'Color' })
  color: string;

  @Prop({ type: String, required: true })
  sku: string;
}

export const VariantSchema = SchemaFactory.createForClass(Variant);
