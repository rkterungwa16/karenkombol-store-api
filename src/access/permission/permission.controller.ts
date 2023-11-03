import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { JwtGuard } from '@auth/guards';
import { PermissionGuard } from '@auth/guards/permissions.guard';
import {
  PermissionResources,
  PermissionActionsTypes,
} from './interfaces/permission.interface';
import { Permission } from '@decorators';
import { PermissionService } from './permission.service';
import { PermissionsResponseDto } from './dto';
import { ResponseDto } from '@pagination';

@Controller('permission')
@UseGuards(JwtGuard)
export class PermissionController {
  constructor(private permissionService: PermissionService) {}
  @ApiOperation({ description: 'Get list of permissions' })
  @Permission({
    resource: PermissionResources.PERMISSIONS,
    action: PermissionActionsTypes.READ,
  })
  @UseGuards(PermissionGuard)
  @Get()
  public async fetchRoles(): Promise<ResponseDto<PermissionsResponseDto[]>> {
    const data = await this.permissionService.fetchPermissions();
    return {
      status: 200,
      data,
      message: 'success',
    };
  }
}
