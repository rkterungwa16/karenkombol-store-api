import { Document } from 'mongoose';

export interface IColor extends Document {
  hexCode: string;
  name: string;
}
