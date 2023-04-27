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
  PermissionActions,
  PermissionResources,
} from '@access/permission/interfaces/permission.interface';
import { PaginationQueryDto } from '@common';
import { JwtGuard } from '@auth/guards';
import { PermissionGuard } from '@auth/guards/permissions.guard';

@Controller('role')
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
    action: PermissionActions.READ,
  })
  @UseGuards(PermissionGuard)
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
  @UseGuards(PermissionGuard)
  @Get('/:id')
  public getRoleById(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<RoleResponseDto> {
    return this.roleService.fetchRoleById(id);
  }

  @ApiOperation({ description: 'Create new role' })
  @ApiConflictResponse({ description: "There's a role with name admin" })
  @Permission({
    resource: PermissionResources.ROLES,
    action: PermissionActions.CREATE,
  })
  @UseGuards(PermissionGuard)
  @Post()
  public create(
    @Body() roleDto: CreateRoleRequestDto,
  ): Promise<RoleResponseDto> {
    return this.roleService.create(roleDto);
  }

  @ApiOperation({ description: 'Update role by id' })
  @ApiBadRequestResponse({ description: "There's no role with specified id" })
  @Permission({
    resource: PermissionResources.ROLES,
    action: PermissionActions.UPDATE,
  })
  @UseGuards(PermissionGuard)
  @Put('/:id')
  public updateRole(
    @Param('id') id: string,
    @Body() roleDto: UpdateRoleRequestDto,
  ): Promise<RoleResponseDto> {
    return this.roleService.update(id, roleDto);
  }
}
