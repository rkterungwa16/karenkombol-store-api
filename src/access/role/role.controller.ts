import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';

import { ApiOperation, ApiQuery, ApiConflictResponse } from '@nestjs/swagger';

import { Permission } from '@decorators';

import {
  RoleResponseDto,
  CreateRoleRequestDto,
  UpdateRoleRequestDto,
} from './dto';

import { RoleService } from './role.service';
import {
  PermissionActions,
  PermissionResources,
} from '@access/permission/interfaces/permission.interface';
import { PaginationQueryDto } from 'src/common';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}
  @ApiOperation({ description: 'Get a paginated role list' })
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
    example: 'admin',
  })
  @Permission({
    resource: PermissionResources.ROLES,
    action: PermissionActions.READ,
  })
  @Get()
  public fetchRoles(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<RoleResponseDto[]> {
    return this.roleService.fetchRoles(paginationQuery);
  }

  @ApiOperation({ description: 'Get role by id' })
  @Permission({
    resource: PermissionResources.ROLES,
    action: PermissionActions.READ,
  })
  @Get('/:id')
  public getRoleById(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<RoleResponseDto> {
    return this.roleService.fetchRoleById(id);
  }

  @ApiOperation({ description: 'Create new role' })
  @ApiConflictResponse({ description: 'Role already exists' })
  @Permission({
    resource: PermissionResources.ROLES,
    action: PermissionActions.CREATE,
  })
  @Post()
  public createRole(
    @Body(ValidationPipe) roleDto: CreateRoleRequestDto,
  ): Promise<RoleResponseDto> {
    return this.roleService.createRole(roleDto);
  }

  @ApiOperation({ description: 'Update role by id' })
  @ApiConflictResponse({ description: 'Role already exists' })
  @Permission({
    resource: PermissionResources.ROLES,
    action: PermissionActions.UPDATE,
  })
  @Put('/:id')
  public updateRole(
    @Param('id') id: string,
    @Body(ValidationPipe) roleDto: UpdateRoleRequestDto,
  ): Promise<RoleResponseDto> {
    return this.roleService.update(id, roleDto);
  }
}
