import {
  PermissionResources,
  PermissionActions,
  IPermissions,
} from '@access/permission/interfaces/permission.interface';

export const createdPermission: IPermissions = {
  _id: 'permission_123456',
  resource: PermissionResources.ALL,
  actions: [...Object.values(PermissionActions)],
};
