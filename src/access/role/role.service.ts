import { Injectable } from '@nestjs/common';
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

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Company.name) private readonly companyModel: Model<Company>,
    @InjectModel(Role.name) private readonly roleModel: Model<Role>,
  ) {}
  public async create(
    createRoleRequestDto: CreateRoleRequestDto,
  ): Promise<RoleResponseDto> {
    const newCompany = await this.companyModel.findById(
      createRoleRequestDto.company,
    );

    const newRole = await this.roleModel.create({
      name: createRoleRequestDto.name,
      company: newCompany._id,
      permissions: createRoleRequestDto.permissions,
    });
    return RoleMapper.toDto(newRole);
  }

  public async update(
    id: string,
    updateRoleRequestDto: UpdateRoleRequestDto,
  ): Promise<RoleResponseDto> {
    const updatedRole = await this.roleModel.findByIdAndUpdate(
      id,
      updateRoleRequestDto,
    );
    return RoleMapper.toDto(updatedRole);
  }
}
