import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Role } from './schemas/role.schema';
import { Company } from '@company/schema/company.schema';
import {
  RoleResponseDto,
  CreateRoleRequestDto,
  UpdateRoleRequestDto,
} from './dto';
import { RoleMapper } from './role.mapper';
import { KKConflictException, KKNotFoundException } from '@http/exceptions';
import { PaginationQueryDto } from '@common';
import { IRole, PermissionUpdateActions } from './interfaces/roles.interface';
import { ICompany } from '@company/interface/company.interface';
import { Permission } from '@access/permission/schema/permission.schema';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Company.name) private readonly companyModel: Model<Company>,
    @InjectModel(Permission.name)
    private readonly permissionModel: Model<Permission>,
    @InjectModel(Role.name) private readonly roleModel: Model<Role>,
  ) {}
  public async create(
    createRoleRequestDto: CreateRoleRequestDto,
  ): Promise<RoleResponseDto> {
    const name = createRoleRequestDto.name.toLowerCase();
    const roleExists: IRole = await this.roleModel.findOne({
      name,
    });
    if (roleExists) {
      throw new KKConflictException('role');
    }
    const newCompany: ICompany = await this.companyModel.findById(
      createRoleRequestDto.company,
    );

    const newRole: Role = await this.roleModel.create({
      name,
      company: newCompany._id,
      permissions: createRoleRequestDto.permissions,
    });
    return RoleMapper.toDto(newRole);
  }

  /**
   * Test cases
   *
   * @param id role id
   * @param permission_action action to be performed with the role permissions
   * @param updateRoleRequestDto data to be updated.
   * @returns updated role object
   */
  public async update(
    id: string,
    permission_action = PermissionUpdateActions.ADD,
    updateRoleRequestDto: UpdateRoleRequestDto,
  ): Promise<RoleResponseDto> {
    let updateData = {};
    const { name, permissions } = updateRoleRequestDto;
    try {
      if (name) {
        updateData = {
          name,
        };
      }
      if (permissions && permissions.length) {
        const permissionsCount = await this.permissionModel
          .find({
            _id: {
              $in: updateRoleRequestDto.permissions,
            },
          })
          .count();
        if (permissionsCount !== permissions.length) {
          throw new KKNotFoundException('permission');
        }
        const roles = await this.roleModel.findById(id);
        const roleHasPermission = roles.permissions.find(
          (_permission: string) => {
            if (permissions.includes(_permission)) return true;
            return false;
          },
        );
        if (permission_action === PermissionUpdateActions.ADD) {
          if (roleHasPermission) {
            throw new KKConflictException('permission');
          }
          updateData = {
            ...updateData,
            permissions: [...roles.permissions, ...permissions],
          };
        } else if (permission_action === PermissionUpdateActions.REMOVE) {
          if (!roleHasPermission) {
            throw new KKNotFoundException('permission');
          }
          updateData = {
            ...updateData,
            permissions: [
              ...roles.permissions.filter(
                (_permisssion: string) => !permissions.includes(_permisssion),
              ),
            ],
          };
        } else {
          throw new BadRequestException('no permission action');
        }
      }

      const updatedRole: Role = await this.roleModel.findByIdAndUpdate(
        id,
        {
          ...updateData,
        },
        { new: true },
      );
      return RoleMapper.toDto(updatedRole);
    } catch (e) {
      if (e.message) {
        throw e;
      }
      throw new KKNotFoundException('role');
    }
  }

  public async fetchRoleById(id: string): Promise<RoleResponseDto> {
    const role: Role = await this.roleModel
      .findById(id)
      .populate('permissions');
    if (!role) {
      throw new KKNotFoundException('role');
    }
    return RoleMapper.toDto(role);
  }

  public async fetchRoles(
    paginationQuery: PaginationQueryDto,
  ): Promise<RoleResponseDto[]> {
    const { limit, offset } = paginationQuery;
    const roles: Role[] = await this.roleModel
      .find()
      .skip(offset)
      .limit(limit)
      .populate('permissions');
    if (roles.length) {
      return roles.map((_role) => RoleMapper.toDto(_role));
    }
    return [];
  }
}
