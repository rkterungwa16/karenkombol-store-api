import { SetMetadata } from '@nestjs/common';

import { PermissionActions } from '@access/permission/interfaces/permission.interface';

export const Permissions = (
  ...permissions: { resource: string; action: PermissionActions }[]
) => SetMetadata('permissions', permissions);
