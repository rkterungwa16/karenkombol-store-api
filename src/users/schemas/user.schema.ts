import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserStatus } from '../interfaces/user.interface';

@Schema()
export class User extends Document {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ unique: true })
  email: string;

  // @Prop({ type: Types.ObjectId, ref: 'Company' })
  // company: string;

  // @Prop({ type: Types.ObjectId, ref: 'Account' })
  // account: string;

  @Prop()
  avatar: string;

  @Prop()
  status: UserStatus;

  @Prop({ type: [Types.ObjectId], ref: 'Role' })
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
