import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ShirtStyles } from '@product/interface/shirt.interface';

@Schema({ timestamps: true })
export class ShirtStyle extends Document {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  name: string | ShirtStyles;

  @Prop({
    type: String,
  })
  description?: string;
  // common_sleeves: ['short']
  // common_fabric: ['cotton']
  createdAt?: Date;
  updatedAt?: Date;
}

export const ShirtStyleSchema = SchemaFactory.createForClass(ShirtStyle);
