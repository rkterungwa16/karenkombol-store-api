import { SetMetadata } from '@nestjs/common';

import { PermissionActionsTypes } from '@access/permission/interfaces/permission.interface';

export interface IPermissionDecorator {
  resource: string;
  action: PermissionActionsTypes;
}
export const Permission = (permission: IPermissionDecorator) =>
  SetMetadata('permission', permission);
