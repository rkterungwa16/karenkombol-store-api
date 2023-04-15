import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Size extends Document {
  @Prop({ type: String, unique: true })
  type: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'SizeValue' }] })
  values?: string[];
}

export const SizeSchema = SchemaFactory.createForClass(Size);
