import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Stock extends Document {
  @Prop({ type: Number })
  initialQuantity: number;

  @Prop({ type: Number })
  availableQuantity: number;

  @Prop({ type: Types.ObjectId, ref: 'Variant', required: true })
  variant: string;
}

export const StockSchema = SchemaFactory.createForClass(Stock);
