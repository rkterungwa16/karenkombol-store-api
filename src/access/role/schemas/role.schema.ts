import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Role extends Document {
  @Prop({ type: String })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Company', immutable: true })
  company: string;

  @Prop({ type: [Types.ObjectId], ref: 'Permission' })
  permissions: string[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
