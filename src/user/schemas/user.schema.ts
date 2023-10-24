import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserStatus } from '@enums';
import { Role } from '@access/role/schemas/role.schema';
import { Permission } from '@access/permission/schema/permission.schema';

@Schema()
export class User extends Document {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ type: Types.ObjectId, ref: 'Company' })
  company: string;

  // @Prop({ type: Types.ObjectId, ref: 'Account' })
  // account: string;

  @Prop()
  avatar: string;

  @Prop({
    type: String,
    enum: [UserStatus.ACTIVE, UserStatus.BLOCKED, UserStatus.INACTIVE],
  })
  status: UserStatus;

  @Prop({ type: Types.ObjectId, ref: 'Role' })
  role?: string | Role;

  @Prop({ type: [Types.ObjectId], ref: 'Role' })
  permissions?: (string | Permission)[];

  createdAt?: Date;
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
