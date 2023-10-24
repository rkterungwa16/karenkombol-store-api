import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PermissionsResponseDto } from './dto';
import { IPermission } from './interfaces/permission.interface';
import { PermissionMapper } from './permission.mapper';
import { Permission } from './schema/permission.schema';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission.name)
    private readonly permissionModel: Model<Permission>,
  ) {}
  public async fetchPermissions(): Promise<PermissionsResponseDto[]> {
    const permissions: Permission[] = await this.permissionModel.find();
    if (permissions.length) {
      return permissions.map((_permission) =>
        PermissionMapper.toDto(_permission),
      );
    }
    return [];
  }
}
