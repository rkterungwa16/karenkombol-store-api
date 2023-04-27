export interface ICurrency {
  _id: string;
  readonly code: string;
  readonly symbol: string;
  readonly rate: number;
  createdAt?: Date;
  updatedAt?: Date;
}
