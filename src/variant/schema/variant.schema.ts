import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Variant extends Document {
  @Prop({ type: String })
  name: string;

  @Prop({ type: Number })
  amount: number;

  @Prop({ type: [String] })
  imageUrls: string[];

  @Prop({ type: Types.ObjectId, ref: 'Product' })
  product: string;

  @Prop({ type: Types.ObjectId, ref: 'Size' })
  size: string;

  @Prop({ type: Types.ObjectId, ref: 'Color' })
  color: string;

  @Prop({ type: String })
  sku: string;
}

export const UserSchema = SchemaFactory.createForClass(Variant);
