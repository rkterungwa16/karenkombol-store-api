import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  ShirtCategoryFit,
  ShirtCategoryStyles,
} from '../interface/category.interface';
import { Category } from './category.schema';
import { Image } from '../../../lib/image/schema/image.schema';

@Schema({ timestamps: true })
export class ShirtCategory extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Category', unique: true, required: true })
  category?: string | Category;

  @Prop({
    type: String,
  })
  description: string;

  @Prop({
    type: String,
    enum: [...Object.values(ShirtCategoryStyles)],
    required: true,
  })
  style: ShirtCategoryStyles;

  @Prop({ type: Types.ObjectId, ref: 'Image' })
  image?: string | Image;

  @Prop({
    type: String,
    enum: [...Object.values(ShirtCategoryFit)],
    required: true,
  })
  fit: ShirtCategoryFit;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ShirtCategorySchema = SchemaFactory.createForClass(ShirtCategory);
