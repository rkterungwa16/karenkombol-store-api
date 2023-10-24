import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PermissionActionsTypes } from '../interfaces/permission.interface';

@Schema({ timestamps: true })
export class Permission extends Document {
  @Prop({ type: String })
  resource: string;

  @Prop({ type: String, enum: [...Object.values(PermissionActionsTypes)] })
  action: PermissionActionsTypes;

  createdAt?: Date;
  updatedAt?: Date;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
