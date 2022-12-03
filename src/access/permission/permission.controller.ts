import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards';
import { PermissionGuard } from 'src/auth/guards/permissions.guard';
import {
  PermissionResources,
  PermissionActions,
} from './interfaces/permission.interface';
import { Permission } from '@decorators';
import { PermissionService } from './permission.service';
import { PermissionsResponseDto } from './dto';

@Controller('permission')
@UseGuards(JwtGuard)
export class PermissionController {
  constructor(private permissionService: PermissionService) {}
  @ApiOperation({ description: 'Get list of permissions' })
  @Permission({
    resource: PermissionResources.ROLES,
    action: PermissionActions.READ,
  })
  @UseGuards(PermissionGuard)
  @Get()
  public fetchRoles(): Promise<PermissionsResponseDto[]> {
    return this.permissionService.fetchPermissions();
  }
}
