import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HashHelper } from '@helpers';
import {
  CreateUserDto,
  CreateUserRequestDto,
  UserResponseDto,
} from '@user/dto';
import {
  KKConflictException,
  KKUnauthorizedException,
  UnauthorizedErrorType,
} from '@http/exceptions';
import { AuthCredentialsRequestDto, JwtPayload, TokenDto } from './dtos';
import { User } from '@user/schemas/user.schema';
import { TokenService } from './token.service';
import { UserRoles, UserStatus } from '@enums';
import { UserMapper } from '@user/user.mapper';
import { Permission } from '@access/permission/schema/permission.schema';
import { Role } from '@access/role/schemas/role.schema';
import { Company } from '@company/schema/company.schema';
import { ResponseDto } from '@pagination';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Company.name) private readonly companyModel: Model<Company>,
    @InjectModel(Role.name) private readonly roleModel: Model<Role>,
    @InjectModel(Permission.name)
    private readonly permissionModel: Model<Permission>,
    private tokenService: TokenService,
  ) {}

  public async login({
    email,
    password,
  }: AuthCredentialsRequestDto): Promise<TokenDto> {
    const user = await this.userModel.findOne({
      email,
    });

    if (!user) {
      throw new KKUnauthorizedException(
        UnauthorizedErrorType.INVALID_CREDENTIALS,
      );
    }

    const passwordMatch = await HashHelper.compare(password, user.password);

    if (!passwordMatch) {
      throw new KKUnauthorizedException(
        UnauthorizedErrorType.INVALID_CREDENTIALS,
      );
    }
    if (user.status == UserStatus.BLOCKED) {
      throw new KKUnauthorizedException(UnauthorizedErrorType.DISABLED_USER);
    }
    if (user.status == UserStatus.INACTIVE) {
      throw new KKUnauthorizedException(UnauthorizedErrorType.DISABLED_USER);
    }

    const payload: JwtPayload = { id: user._id, email };
    const token = await this.tokenService.generateAuthToken(payload);

    return token;
  }
  public async register(
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

    const permissions = await this.permissionModel.find();
    const permissionIds = permissions.map((_permission) => _permission._id);
    const newRole = await this.roleModel.create({
      name: UserRoles.SUPER_ADMIN,
      company: newCompany._id,
      permissions: [...permissionIds],
    });

    createUserDto.password = await HashHelper.encrypt(
      createUserRequestDto.password,
    );
    createUserDto.company = newCompany._id;
    createUserDto.email = createUserRequestDto.email;
    createUserDto.role = newRole._id;
    createUserDto.status = UserStatus.ACTIVE;
    const newUser = await this.userModel.create(createUserDto);

    return UserMapper.toDto(
      await (
        await newUser.populate('company')
      ).populate({
        path: 'role',
        model: 'Role',
        populate: {
          path: 'permissions',
          model: 'Permission',
        },
      }),
    );
  }
}
