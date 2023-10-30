import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Image } from '../../../lib/image/schema/image.schema';
import { ShirtFits, ShirtStyles } from '@product/interface/shirt.interface';
import { Category } from '@product/category/schema';

// Seed list of shirts
// Example: A loose fit tunic long sleeve cotton
@Schema({ timestamps: true })
export class Shirt extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category?: string | Category;

  @Prop({
    type: String,
  })
  description: string;

  @Prop({
    type: String,
    enum: [...Object.values(ShirtStyles)],
    required: true,
  })
  style: ShirtStyles;

  @Prop({ type: Types.ObjectId, ref: 'Image' })
  image?: string | Image;

  @Prop({
    type: String,
    enum: [...Object.values(ShirtFits)],
    required: true,
  })
  fit: ShirtFits;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ShirtSchema = SchemaFactory.createForClass(Shirt);
