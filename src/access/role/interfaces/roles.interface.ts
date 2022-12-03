import { IPermission } from '@access/permission/interfaces/permission.interface';
import { ICompany } from '@company/interface/company.interface';

export interface IRole {
  _id: string;
  readonly name: string;
  readonly permissions: string[] | IPermission[];
  company: ICompany | string;
}
