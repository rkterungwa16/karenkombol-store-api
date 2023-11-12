import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { instanceToPlain } from 'class-transformer';

import { Role } from './schemas/role.schema';
import { Company } from '@company/schema/company.schema';
import {
  RoleResponseDto,
  CreateRoleRequestDto,
  UpdateRoleRequestDto,
} from './dto';
import { RoleMapper } from './role.mapper';
import { KKConflictException, KKNotFoundException } from '@http/exceptions';
import { PermissionUpdateActions } from './interfaces/roles.interface';
import { Permission } from '@access/permission/schema/permission.schema';
import { Pagination, PaginationResponseDto } from '@pagination';

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
    let company: Company & {
      _id: Types.ObjectId;
    };
    let createData = {};
    const { name, permissions, company_id } = createRoleRequestDto;
    const slug = name.split(' ').join('_');
    const roleExists = await this.roleModel.findOne({
      name,
    });
    if (roleExists) {
      throw new KKConflictException('role');
    }
    createData = {
      ...createData,
      name,
      slug,
    };
    if (company_id) {
      company = await this.companyModel.findById(company_id);
      if (!company) {
        throw new KKNotFoundException('company');
      }
      createData = {
        ...createData,
        company: company._id,
      };
    }

    if (permissions) {
      createData = {
        ...createData,
        permissions,
      };
    }

    const newRole: Role = await this.roleModel.create({
      ...createData,
    });
    return RoleMapper.toDto(newRole);
  }

  /**
   * Test cases
   * - Check if role exists
   * - Check if all permission ids are valid and exists in db
   * - If permission action is to add permission ids, check if a permission id already exists.
   *   - If a permission exists throw error to prevent duplicate
   *   - Else modify the update data by add the permission ids to the role permissions.
   * - If permission action is to remove permissions from a role, check if permission id exists
   *   - If permission id does not exist in the role to be removed, throw an error.
   *   - Else modify the update data by removing the permission ids from the role permissions.
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
              $in: permissions,
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
    paginationQuery,
  ): Promise<PaginationResponseDto<RoleResponseDto[]>> {
    let data = [];
    const { limit, skip, name, createdAt, updatedAt } = paginationQuery;
    const totalRecords = await this.roleModel.count();

    const filter = {
      $and: [
        ...(name && Object.values(name).length
          ? [
              {
                name: {
                  ...(name?.$eq && { $eq: name.$eq }),
                  ...(name?.$contains && { $regex: name.$contains }),
                },
              },
            ]
          : []),
        ...(createdAt && Object.values(createdAt).length
          ? [{ createdAt: instanceToPlain(createdAt) }]
          : []),
        ...(updatedAt && Object.values(updatedAt).length
          ? [{ updatedAt: instanceToPlain(updatedAt) }]
          : []),
      ],
    };

    const roles = await this.roleModel
      .find({
        ...(filter['$and']?.length && { $and: filter['$and'] }),
      })
      .populate('permissions')
      .skip(skip)
      .limit(limit);
    if (roles.length) {
      data = roles.map((_role) => RoleMapper.toDto(_role));
    }
    return Pagination.of({ limit, skip }, totalRecords, data);
  }
}
