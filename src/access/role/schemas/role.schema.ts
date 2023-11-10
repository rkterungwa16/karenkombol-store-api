import { Permission } from '@access/permission/schema/permission.schema';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Role extends Document {
  @Prop({ type: String, unique: true, text: true })
  slug: string;

  @Prop({ type: String, text: true, index: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Company', immutable: true })
  company: string;

  @Prop({ type: [Types.ObjectId], ref: 'Permission' })
  permissions: (string | Permission)[];

  createdAt?: Date;
  updatedAt?: Date;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
