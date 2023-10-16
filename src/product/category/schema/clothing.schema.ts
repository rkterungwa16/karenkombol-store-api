import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ClothingTypes } from '../interface/category.interface';

@Schema({ timestamps: true })
export class Clothing extends Document {
  // @Prop({ type: String })
  // description?: string;

  @Prop({
    type: String,
    enum: [...Object.values(ClothingTypes)],
    required: true,
    unique: true,
  })
  name: ClothingTypes;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ClothingSchema = SchemaFactory.createForClass(Clothing);
