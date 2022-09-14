import { Document } from 'mongoose';

export enum PermissionActions {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}

export interface IPermissions extends Document {
  readonly resource: string;
  readonly actions: PermissionActions[];
}
