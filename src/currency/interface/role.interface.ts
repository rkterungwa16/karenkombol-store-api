import { Document } from 'mongoose';

export interface ICurrency extends Document {
  readonly code: string;
  readonly symbol: string;
  readonly rate: number;
}
