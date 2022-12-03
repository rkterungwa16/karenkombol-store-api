import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Color extends Document {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  hexCode: string;
}

export const ColorSchema = SchemaFactory.createForClass(Color);
