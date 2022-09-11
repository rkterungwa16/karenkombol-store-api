import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Role extends Document {
  @Prop()
  name: string;

  @Prop({ type: [Types.ObjectId], ref: 'Permission' })
  permissions: string[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
