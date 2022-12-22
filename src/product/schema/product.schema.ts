import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ type: String, required: true, unique: true })
  name: string;
  @Prop({ type: String, required: true })
  description: string;
  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: string;
  @Prop({ type: String })
  imageUrl: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
