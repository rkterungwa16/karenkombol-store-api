import { SetMetadata } from '@nestjs/common';

import { PermissionActions } from '@access/permission/interfaces/permission.interface';

export interface IPermissionDecorator {
  resource: string;
  action: PermissionActions;
}
export const Permission = (permission: IPermissionDecorator) =>
  SetMetadata('permission', permission);
