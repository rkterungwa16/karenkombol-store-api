import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Currency extends Document {
  @Prop({ type: String, required: true })
  code: string;

  @Prop({ type: String, required: true })
  symbol: string;

  @Prop({ type: Number, required: true, default: 1 })
  rate: number;
}

export const CurrencySchema = SchemaFactory.createForClass(Currency);
