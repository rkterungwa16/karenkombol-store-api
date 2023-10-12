import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CategoryTypes } from '../interface/category.interface';

@Schema({ timestamps: true })
export class CategoryType extends Document {
  @Prop({ type: String })
  description?: string;

  @Prop({
    type: String,
    enum: [...Object.values(CategoryTypes)],
    required: true,
    unique: true,
  })
  name: CategoryTypes;

  createdAt?: Date;
  updatedAt?: Date;
}

export const CategoryTypeSchema = SchemaFactory.createForClass(CategoryType);
