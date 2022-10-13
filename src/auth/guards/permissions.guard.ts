import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { extractJwt } from '@helpers';
import { TokenService } from '../token.service';
import { TokenType, UserRoles } from '@enums';
import { User } from '@user/schemas/user.schema';
import { IPermissionDecorator } from '@decorators';
import { Permission } from '@access/permission/schema/permission.schema';
import { Role } from '@access/role/schemas/role.schema';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private reflector: Reflector,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Role.name) private readonly roleModel: Model<Role>,
    @InjectModel(Permission.name)
    private readonly permissionModel: Model<Permission>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permission = this.reflector.get<IPermissionDecorator>(
      'permission',
      context.getHandler(),
    );
    if (!permission) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = extractJwt(request);
    const { id } = this.tokenService.verifyToken(token, TokenType.AccessToken);
    const userModel = await this.userModel.findById(id);
    const permissionModel = await this.permissionModel.findOne({
      resource: permission.resource,
    });
    const roleModels = await Promise.all(
      userModel.roles.map((role) => this.roleModel.findById(role)),
    );

    const isSuperAdmin = roleModels.find(
      (role) => role.name === UserRoles.SUPER_ADMIN,
    );
    if (isSuperAdmin) {
      return true;
    }
    // Check if permission exists for this users role
    // If permission exists check if user can perform specified action
    const roleWithPermissionExists = roleModels.find((role) => {
      return role.permissions.includes(permissionModel._id);
    });
    if (roleWithPermissionExists) {
      return permissionModel.actions.includes(permission.action);
    }
    return false;
  }
}
