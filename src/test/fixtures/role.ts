import { IRole } from '@access/role/interfaces/roles.interface';
import { createdCompany } from './company';
import { createdPermission } from './permission';
export const createdRole: IRole = {
  _id: 'role_12345',
  name: 'role_name',
  company: createdCompany,
  permissions: [createdPermission],
};
