import { IPermission } from '@access/permission/interfaces/permission.interface';
import { ICompany } from '@company/interface/company.interface';

export interface IRole {
  _id: string;
  name: string;
  permissions: string[] | IPermission[];
  company: ICompany | string;
}
