export interface ICurrency {
  _id: string;
  readonly code: string;
  readonly symbol: string;
  readonly rate: number;
  status?: CurrencyStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum CurrencyStatus {
  Active = 'ACTIVE',
  InActive = 'INACTIVE',
}
