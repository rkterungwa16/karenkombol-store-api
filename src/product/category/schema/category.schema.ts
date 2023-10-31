import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ClothingTypes } from '../interface/category.interface';
import { Shirt } from '@product/shirt/schema/shirt.schema';

/**
 * A category has one unique type associated with it.
 * This type is gotten from the list of types created.
 * Example of types include shirts, skirts, dress etc.
 * Each of this type as subtypes. Example, shirt
 *
 * The primary difference between categories is clothing type.
 * - List categories as a list of clothing types
 * - If you click on the clothing type you get all types with different properties.
 *   - Example Click on shirt will give tunic shirt, jacket shirt, blouse
 *
 * Example category description: A shirt category that is a tunic
 * Example categories: shirt, dresses, skirt, trousers.
 * Example sub-categories: loose tunic shirt,
 *
 * List all shirts categories.
 * - If adding a product
 *   - Search for the clothing type for this product (e.g shirt, dress)
 *   - select type of category.
 *     - If shirt is selected
 *     - List all types of shirts based on styles, fits and fabric.
 *     - You can search/filter for the type of shirt style you want.
 *     - You can search/filter for the type of shirt fabric you want.
 *     - You can search/filter for the type of shirt fit you want.
 *     - Example: This product is a loose tunic shirt made of cotton.
 *
 */
@Schema({ timestamps: true })
export class Category extends Document {
  @Prop({
    type: String,
    enum: [...Object.values(ClothingTypes)],
    required: true,
    unique: true,
  })
  name: ClothingTypes;

  @Prop({ type: String })
  description?: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Shirt',
  })
  shirts?: (string | Shirt)[];

  createdAt?: Date;
  updatedAt?: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
