import { IRole } from '@access/role/interfaces/roles.interface';
import { ICompany } from '@company/interface/company.interface';
import { UserStatus } from '@enums';

export interface IUser {
  _id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  status: UserStatus;
  company: ICompany;
  role: [IRole];
  avatar?: string;
}
