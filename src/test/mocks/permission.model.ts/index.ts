import {
  PermissionResources,
  PermissionActionsTypes,
} from '@access/permission/interfaces/permission.interface';

import { createdPermission } from '../../fixtures';

export type CreatePermissionProps = {
  resource: PermissionResources;
  actions: PermissionActionsTypes[];
  company: any;
};

export class TestPermissionModel {
  create = jest.fn().mockResolvedValue(createdPermission);
  findAll = jest.fn();
  findOne = jest.fn();
  update = jest.fn();
  remove = jest.fn();
}
