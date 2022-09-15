import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { CompanyStatus } from '../interface/company.interface';

@Schema()
export class Company extends Document {
  @Prop({ unique: true })
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  phonenumber: string;

  // @Prop({ type: [Types.ObjectId], ref: 'Contact' })
  // contacts: string[];

  // @Prop({ type: [Types.ObjectId], ref: 'Address' })
  // addresses: string[];

  @Prop({
    type: String,
    enum: [CompanyStatus.ACTIVE, CompanyStatus.BLOCKED, CompanyStatus.INACTIVE],
  })
  status: CompanyStatus;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
