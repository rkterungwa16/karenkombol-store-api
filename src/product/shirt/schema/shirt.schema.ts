import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Image } from '../../../lib/image/schema/image.schema';
import { ShirtFits } from '@product/interface/shirt.interface';
import { Category } from '@product/category/schema';
import { ShirtStyle } from './shirt-style.schema';

// Seed list of shirts
// Example: A loose fit tunic long sleeve cotton
// To create a shirt
// - Check if a shirt category already exists
// - Extract the id for the category
// - Select the shirt style from a list of styles (via search style).
// DEFINE UNIQUE SHIRT 1
// - A unique shirt has its style, fit, fabric, sleeves combined unique.
// - No two shirts should have the exact same combination of all 4 properties.
// - A shirt style should have recommended/common fabric, fit, collars, embroidery/decor, and color.
// - A shirt style is usually worn with..
// DEFINE UNIQUE SHIRT 2
// - A unique shirt is defined by only its style.
// - When creating a product
@Schema({ timestamps: true, autoIndex: true })
export class Shirt extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category?: string | Category;

  @Prop({
    type: String,
    index: true,
    text: true,
  })
  description: string;

  @Prop({
    type: String,
    index: true,
    text: true,
  })
  name: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'ShirtStyle',
    required: true,
  })
  style: string | ShirtStyle;

  @Prop({ type: Types.ObjectId, ref: 'Image' })
  image?: string | Image;

  @Prop({
    type: String,
    enum: [...Object.values(ShirtFits)],
    required: true,
    index: true,
    text: true,
  })
  fit: ShirtFits;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ShirtSchema = SchemaFactory.createForClass(Shirt);
