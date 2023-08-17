import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HashHelper } from '@helpers';
import { CreateUserRequestDto, UserResponseDto, CreateUserDto } from './dto';
import { User } from './schemas/user.schema';
import { Company } from '@company/schema/company.schema';
import { UserMapper } from './user.mapper';
import { Role } from '@access/role/schemas/role.schema';
import { Permission } from '@access/permission/schema/permission.schema';
import { KKConflictException } from '@http/exceptions';
import {
  PermissionResources,
  PermissionActions,
  IPermission,
} from '@access/permission/interfaces/permission.interface';
import { UserRoles, UserStatus } from '@enums';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Company.name) private readonly companyModel: Model<Company>,
    @InjectModel(Role.name) private readonly roleModel: Model<Role>,
    @InjectModel(Permission.name)
    private readonly permissionModel: Model<Permission>,
  ) {}
  public async create(
    createUserRequestDto: CreateUserRequestDto,
  ): Promise<UserResponseDto> {
    const createUserDto = new CreateUserDto();
    const userExists = await this.userModel.findOne({
      email: createUserRequestDto.email,
    });
    if (userExists) {
      throw new KKConflictException('user');
    }
    const companyExists = await this.companyModel.findOne({
      name: createUserRequestDto.companyName,
    });
    // Send invite link to user via email
    // user clicks on the link to open create account form with company name displayed as a disabled input
    // user enters email and password
    if (companyExists) {
      // Find the super-admin to send an invite
      // Super admin can assign invite roles to any other individual.
      throw new KKConflictException('company');
    }
    const newCompany = await this.companyModel.create({
      name: createUserRequestDto.companyName,
    });
    const newPermission: IPermission = await this.permissionModel.create({
      resource: PermissionResources.ALL,
      actions: [...Object.values(PermissionActions)],
      company: newCompany._id,
    });
    const newRole = await this.roleModel.create({
      name: UserRoles.SUPER_ADMIN,
      company: newCompany._id,
      permissions: [newPermission._id],
    });

    createUserDto.password = await HashHelper.encrypt(
      createUserRequestDto.password,
    );
    createUserDto.company = newCompany._id;
    createUserDto.email = createUserRequestDto.email;
    createUserDto.roles = [newRole._id];
    createUserDto.status = UserStatus.ACTIVE;
    const newUser = await this.userModel.create(createUserDto);

    return UserMapper.toDto(
      await (await newUser.populate('company')).populate('roles'),
    );
  }
}
