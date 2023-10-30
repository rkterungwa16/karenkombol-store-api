import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ProductStatus } from '@product/interface/product.interface';
import { Document, Types } from 'mongoose';

/**
 * Categories are a list of clothing types
 * Example clothing types include: shirt, skirt, blouse, trousers, dress etc
 *
 * A product is an item that falls under any of the categories.
 * Example of a product is a tunic shirt
 *
 * A variant is the different types of a product.
 * Example of variants for a tunic are: long sleeve red medium linen tunic shirt with lined collar
 *
 * Collections are a list of fashion styles
 * Example fashion styles include: Streetwear Style, Formal Office Wear,
 * Business Casual, Glamorous Evening – Black Tie, Maternity Style, Classic fashion Style, Casual chic fashion style,
 * Vacation (Resort) style, Boho/Bohemian chic, Haute Couture, Modest fashion, Prairie chic style, Ankara style,
 * Artsy Fashion
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
export class Product extends Document {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: string;

  @Prop({ type: Types.ObjectId, ref: 'Image' })
  image: string;

  @Prop({
    type: String,
    enum: [...Object.values(ProductStatus)],
    default: ProductStatus.InActive,
  })
  status: ProductStatus;

  @Prop({ type: Boolean, default: false })
  published: boolean;

  @Prop({ type: [String] })
  tags?: string[];

  createdAt?: Date;
  updatedAt?: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
