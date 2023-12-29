import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { extractJwt } from '@helpers';
import { TokenService } from '../token.service';
import { TokenType } from '@enums';
import { IPermissionDecorator } from '@decorators';
import { UsersService } from '@user/user.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private reflector: Reflector,
    private userService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    let hasPermission;
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
    const user = await this.userService.fetchUserById(id);
    const userPermissions = user?.permissions;
    hasPermission = userPermissions.some((_permission) => {
      if (typeof _permission !== 'string') {
        return (
          _permission.resource === permission.resource &&
          _permission.action === permission.action
        );
      }
      return false;
    });
    if (hasPermission) {
      return true;
    }
    // TODO: add role to permissions
    // TODO: find permission using resource and action and check if role is assigned to permission.
    // NOTE: Each permission should have a role assigned to it.
    const rolePermissions =
      user?.role && typeof user.role !== 'string' ? user.role.permissions : [];

    hasPermission = rolePermissions.some((_permission) => {
      if (typeof _permission !== 'string') {
        return (
          _permission.resource === permission.resource &&
          _permission.action === permission.action
        );
      }
      return false;
    });
    if (hasPermission) {
      return true;
    }
    return false;
  }
}
