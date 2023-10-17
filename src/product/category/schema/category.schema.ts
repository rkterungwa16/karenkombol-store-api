import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Clothing } from './clothing.schema';
import { Shirt } from './shirt.schema';

/**
 * A category has one unique type associated with it.
 * This type is gotten from the list of types created.
 * Example of types include shirts, skirts, dress etc.
 * Each of this type as subtypes. Example, shirt
 *
 * Example category description: A shirt category that is a tunic
 */
@Schema({ timestamps: true })
export class Category extends Document {
  @Prop({
    type: Types.ObjectId,
    ref: 'Clothing',
    required: true,
    unique: true,
  })
  clothing: string | Clothing;

  @Prop({
    type: Types.ObjectId,
    ref: 'Shirt',
  })
  shirt?: string | Shirt;

  createdAt?: Date;
  updatedAt?: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
