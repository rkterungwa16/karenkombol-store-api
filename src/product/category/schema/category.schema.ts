import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { CategoryType } from './category-type.schema';
import { ShirtCategory } from './shirt-category.schema';

@Schema({ timestamps: true })
export class Category extends Document {
  @Prop({
    type: Types.ObjectId,
    ref: 'CategoryType',
    required: true,
    unique: true,
  })
  categoryType: string | CategoryType;

  @Prop({
    type: [Types.ObjectId],
    ref: 'ShirtCategory',
  })
  shirts?: (string | ShirtCategory)[];

  createdAt?: Date;
  updatedAt?: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
