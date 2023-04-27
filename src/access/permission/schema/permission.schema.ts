import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PermissionActions } from '../interfaces/permission.interface';

@Schema({ timestamps: true })
export class Permission extends Document {
  @Prop({ type: String })
  resource: string;

  @Prop({ type: Array })
  actions: PermissionActions[];
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
