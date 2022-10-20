import {
  PermissionResources,
  PermissionActions,
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
    const permissions = Object.values(PermissionResources).map((_resource) => ({
      resource: _resource,
      actions: [...Object.values(PermissionActions)],
    }));
    return this.permission.insertMany(permissions);
  }

  async drop(): Promise<any> {
    const collectionExists = this.permission.collection.collectionName;
    if (collectionExists) {
      return this.permission.collection.drop();
    }
  }
}
