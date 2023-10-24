import { createdCompany } from './company';
import { createdPermission } from './permission';
export const createdRole = {
  _id: 'role_12345',
  name: 'role_name',
  company: createdCompany,
  permissions: [createdPermission],
};
