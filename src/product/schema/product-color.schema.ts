import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class ProductColor extends Document {
  @Prop({
    type: Types.ObjectId,
    ref: 'Color',
    required: true,
  })
  color: string;

  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product: string;
}

export const ProductColorSchema = SchemaFactory.createForClass(ProductColor);
