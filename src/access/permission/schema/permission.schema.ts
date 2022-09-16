import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PermissionActions } from '../interfaces/permission.interface';

@Schema()
export class Permission extends Document {
  @Prop()
  resource: string;

  @Prop({ type: Types.ObjectId, ref: 'Company' })
  company: string;

  @Prop()
  actions: PermissionActions[];
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
