import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class SizeValue extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Size' })
  size: string;

  @Prop({ type: MongooseSchema.Types.Mixed })
  value: string | number;
}

export const SizeValueSchema = SchemaFactory.createForClass(SizeValue);
