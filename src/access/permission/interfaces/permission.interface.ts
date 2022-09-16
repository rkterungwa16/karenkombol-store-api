import { Document } from 'mongoose';

export enum PermissionActions {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  // FULL_ACCESS = 'full_access',
}

export enum PermissionResources {
  ALL = 'all',
}

export interface IPermissions extends Document {
  readonly resource: string;
  readonly company: string;
  readonly actions: PermissionActions[];
}
