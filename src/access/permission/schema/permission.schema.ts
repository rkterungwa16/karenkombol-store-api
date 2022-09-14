import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PermissionActions } from '../interfaces/permission.interface';

@Schema()
export class Permission extends Document {
  @Prop()
  resource: string;

  @Prop()
  actions: PermissionActions[];
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
