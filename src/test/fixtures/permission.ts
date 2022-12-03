import {
  PermissionResources,
  PermissionActions,
  IPermission,
} from '@access/permission/interfaces/permission.interface';

export const createdPermission: IPermission = {
  _id: 'permission_123456',
  resource: PermissionResources.ALL,
  actions: [...Object.values(PermissionActions)],
};
