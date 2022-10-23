import { Injectable, NotFoundException } from '@nestjs/common';
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
import {
  RoleDoesNotExistsException,
  RoleExistsException,
} from '@http/exceptions';
import { PaginationQueryDto } from 'src/common';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Company.name) private readonly companyModel: Model<Company>,
    @InjectModel(Role.name) private readonly roleModel: Model<Role>,
  ) {}
  public async createRole(
    createRoleRequestDto: CreateRoleRequestDto,
  ): Promise<RoleResponseDto> {
    const name = createRoleRequestDto.name.toLowerCase();
    const roleExists = await this.roleModel.findOne({
      name,
    });
    if (roleExists) {
      throw new RoleExistsException(name);
    }
    const newCompany = await this.companyModel.findById(
      createRoleRequestDto.company,
    );

    const newRole = await this.roleModel.create({
      name,
      company: newCompany._id,
      permissions: createRoleRequestDto.permissions,
    });
    return RoleMapper.toDto(newRole);
  }

  public async update(
    id: string,
    updateRoleRequestDto: UpdateRoleRequestDto,
  ): Promise<RoleResponseDto> {
    try {
      const updatedRole = await this.roleModel.findByIdAndUpdate(
        id,
        updateRoleRequestDto,
      );
      return RoleMapper.toDto(updatedRole);
    } catch (e) {
      throw new RoleDoesNotExistsException();
    }
  }

  public async fetchRoleById(id: string): Promise<RoleResponseDto> {
    const role = await this.roleModel.findById(id).populate('permissions');
    if (!role) {
      throw new NotFoundException();
    }
    return RoleMapper.toDto(role);
  }

  public async fetchRoles(
    paginationQuery: PaginationQueryDto,
  ): Promise<RoleResponseDto[]> {
    const { limit, offset } = paginationQuery;
    const roles = await this.roleModel
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
