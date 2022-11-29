import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Currency extends Document {
  @Prop({ type: String })
  code: string;

  @Prop({ type: String })
  symbol: string;
}

export const CurrencySchema = SchemaFactory.createForClass(Currency);
