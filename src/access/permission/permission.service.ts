import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PermissionsResponseDto } from './dto';
import { PermissionMapper } from './permission.mapper';
import { Permission } from './schema/permission.schema';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission.name)
    private readonly permissionModel: Model<Permission>,
  ) {}
  public async fetchRoles(): Promise<PermissionsResponseDto[]> {
    const permissions = await this.permissionModel.find();
    if (permissions.length) {
      return permissions.map((_role) => PermissionMapper.toDto(_role));
    }
    return [];
  }
}
