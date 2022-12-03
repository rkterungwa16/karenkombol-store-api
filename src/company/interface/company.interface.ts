import { Document } from 'mongoose';

export enum CompanyStatus {
  ACTIVE = 'active',
  BLOCKED = 'blocked',
  INACTIVE = 'inactive',
}

export interface ICompany {
  _id: string;
  readonly name: string;
  readonly contacts?: string[];
  readonly addresses?: string[];
  readonly phonenumber?: string;
  readonly email?: string;
  readonly status?: CompanyStatus;
}
