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
import { IRole } from './interfaces/roles.interface';
import { ICompany } from '@company/interface/company.interface';

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
    const roleExists: IRole = await this.roleModel.findOne({
      name,
    });
    if (roleExists) {
      throw new RoleExistsException(name);
    }
    const newCompany: ICompany = await this.companyModel.findById(
      createRoleRequestDto.company,
    );

    const newRole: IRole = await this.roleModel.create({
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
      const updatedRole: IRole = await this.roleModel.findByIdAndUpdate(
        id,
        updateRoleRequestDto,
      );
      return RoleMapper.toDto(updatedRole);
    } catch (e) {
      throw new RoleDoesNotExistsException();
    }
  }

  public async fetchRoleById(id: string): Promise<RoleResponseDto> {
    const role: IRole = await this.roleModel
      .findById(id)
      .populate('permissions');
    if (!role) {
      throw new NotFoundException();
    }
    return RoleMapper.toDto(role);
  }

  public async fetchRoles(
    paginationQuery: PaginationQueryDto,
  ): Promise<RoleResponseDto[]> {
    const { limit, offset } = paginationQuery;
    const roles: IRole[] = await this.roleModel
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
