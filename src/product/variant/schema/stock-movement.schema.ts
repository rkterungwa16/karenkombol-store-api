import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class StockMovement extends Document {
  @Prop({ type: Number })
  quantity: number;

  @Prop({ type: Types.ObjectId, ref: 'Stock', required: true })
  stock: string;
}

export const StockMovementSchema = SchemaFactory.createForClass(StockMovement);
