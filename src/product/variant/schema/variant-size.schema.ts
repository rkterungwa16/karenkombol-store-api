import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class VariantSize extends Document {
  @Prop({ type: Number })
  price: number;

  @Prop({ type: Types.ObjectId, ref: 'Variant' })
  variant: string;

  @Prop({ type: Types.ObjectId, ref: 'Size' })
  size: string;
}

export const VariantSizeSchema = SchemaFactory.createForClass(VariantSize);
