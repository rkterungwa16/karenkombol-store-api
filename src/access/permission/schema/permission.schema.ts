import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PermissionActions } from '../interfaces/permission.interface';

@Schema()
export class Permission extends Document {
  @Prop({ type: String })
  resource: string;

  @Prop({ type: Array })
  actions: PermissionActions[];
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
