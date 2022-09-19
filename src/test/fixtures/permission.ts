import {
  PermissionResources,
  PermissionActions,
} from '@access/permission/interfaces/permission.interface';
import { createdCompany } from './company';

export const createdPermission = {
  _id: 'permission_123456',
  resource: PermissionResources.ALL,
  actions: [...Object.values(PermissionActions)],
  company: createdCompany,
};
