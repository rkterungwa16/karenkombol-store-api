import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Size extends Document {
  @Prop({ type: String, unique: true })
  type: string;

  @Prop({ type: [Types.ObjectId], ref: 'SizeValue' })
  values?: (number | string)[];
}

export const SizeSchema = SchemaFactory.createForClass(Size);
