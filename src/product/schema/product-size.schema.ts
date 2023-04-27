import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class ProductSize extends Document {
  @Prop({
    type: Types.ObjectId,
    ref: 'SizeValue',
    required: true,
  })
  size: string;

  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product: string;
}

export const ProductSizeSchema = SchemaFactory.createForClass(ProductSize);
