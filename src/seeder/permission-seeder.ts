import {
  PermissionResources,
  PermissionActionsTypes,
} from '@access/permission/interfaces/permission.interface';
import { Permission } from '@access/permission/schema/permission.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder } from './seeder.interface';

@Injectable()
export class PermissionsSeeder implements Seeder {
  constructor(
    @InjectModel(Permission.name)
    private readonly permission: Model<Permission>,
  ) {}

  async seed(): Promise<any> {
    let permissions;
    permissions = Object.values(PermissionResources).map((_resource) => {
      return Object.values(PermissionActionsTypes).map((_action) => {
        return {
          resource: _resource,
          action: _action,
        };
      });
    });
    permissions = permissions.flat();
    const data = await this.permission.find({});
    permissions = permissions.filter((_permission) => {
      if (data.find((_c) => _c.resource === _permission.resource)) return false;
      return true;
    });
    return this.permission.insertMany(permissions);
  }

  async drop(): Promise<any> {
    const collectionExists = this.permission.collection.collectionName;
    if (collectionExists) {
      return this.permission.collection.drop();
    }
  }
}
