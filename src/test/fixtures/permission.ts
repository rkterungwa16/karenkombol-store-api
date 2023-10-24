import {
  PermissionResources,
  PermissionActionsTypes,
} from '@access/permission/interfaces/permission.interface';

export const createdPermission = {
  _id: 'permission_123456',
  resource: PermissionResources.ORDERS,
  action: PermissionActionsTypes.CREATE,
};
