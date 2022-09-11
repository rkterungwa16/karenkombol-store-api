import { Document } from 'mongoose';

export interface IRoles extends Document {
  readonly name: string;
  readonly permissions: string[];
}
