import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Size extends Document {
  @Prop({ type: String, unique: true })
  type: string;

  @Prop({ type: [String, Number] })
  value: string | number;
}

export const SizeSchema = SchemaFactory.createForClass(Size);
