import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiQuery,
  ApiConflictResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

import { Permission } from '@decorators';

import {
  RoleResponseDto,
  CreateRoleRequestDto,
  UpdateRoleRequestDto,
} from './dto';

import { RoleService } from './role.service';
import {
  PermissionActionsTypes,
  PermissionResources,
} from '@access/permission/interfaces/permission.interface';
import { JwtGuard } from '@auth/guards';
import { PermissionGuard } from '@auth/guards/permissions.guard';
import { PermissionUpdateActions } from './interfaces/roles.interface';
import { PaginationResponseDto, ResponseDto } from '@pagination';
import { RoleQueryDto } from './dto/role-query.dto';

@Controller('roles')
@UseGuards(JwtGuard)
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
    action: PermissionActionsTypes.READ,
  })
  @UseGuards(PermissionGuard)
  @Get()
  public fetchRoles(
    @Query() paginationQuery: RoleQueryDto,
  ): Promise<PaginationResponseDto<RoleResponseDto[]>> {
    return this.roleService.fetchRoles(paginationQuery);
  }

  @ApiOperation({ description: 'Get role by id' })
  @Permission({
    resource: PermissionResources.ROLES,
    action: PermissionActionsTypes.READ,
  })
  @UseGuards(PermissionGuard)
  @Get('/:id')
  public async getRoleById(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<ResponseDto<RoleResponseDto>> {
    const data = await this.roleService.fetchRoleById(id);
    return {
      data,
      status: 200,
      message: 'success',
    };
  }

  @ApiOperation({ description: 'Create new role' })
  @ApiConflictResponse({ description: "There's a role with name admin" })
  @Permission({
    resource: PermissionResources.ROLES,
    action: PermissionActionsTypes.CREATE,
  })
  @UseGuards(PermissionGuard)
  @Post()
  public async create(
    @Body() roleDto: CreateRoleRequestDto,
  ): Promise<ResponseDto<RoleResponseDto>> {
    const data = await this.roleService.create(roleDto);
    return {
      data,
      status: 201,
      message: 'success',
    };
  }

  @ApiOperation({ description: 'Update role by id' })
  @ApiBadRequestResponse({ description: "There's no role with specified id" })
  @Permission({
    resource: PermissionResources.ROLES,
    action: PermissionActionsTypes.UPDATE,
  })
  @UseGuards(PermissionGuard)
  @Put('/:id/:permission_action')
  public async updateRole(
    @Param('id') id: string,
    @Param('permission_action')
    permission_action: PermissionUpdateActions,
    @Body() roleDto: UpdateRoleRequestDto,
  ): Promise<ResponseDto<RoleResponseDto>> {
    const data = await this.roleService.update(id, permission_action, roleDto);
    return {
      data,
      status: 200,
      message: 'success',
    };
  }
}
