import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ProductStatus } from '@product/interface/product.interface';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: string;

  @Prop({ type: String })
  imageUrl: string;

  @Prop({
    type: String,
    enum: [...Object.values(ProductStatus)],
    default: ProductStatus.InActive,
  })
  status: ProductStatus;

  @Prop({ type: Boolean })
  published: boolean;

  @Prop({ type: [String] })
  tags: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
