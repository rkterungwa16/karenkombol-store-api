import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HashHelper } from '@helpers';
import { CreateUserRequestDto, UserResponseDto } from './dto';
import { User } from './schemas/user.schema';
import { Company } from '@company/schema/company.schema';
import { UserMapper } from './user.mapper';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Company.name) private readonly companyModel: Model<Company>,
  ) {}
  public async create(
    createUserDto: CreateUserRequestDto,
  ): Promise<UserResponseDto> {
    const userExists = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (userExists) {
      // throw error
    }
    const companyExists = await this.companyModel.findOne({
      name: createUserDto.companyName,
    });
    if (companyExists) {
      // throw error.
    }
    createUserDto.password = await HashHelper.encrypt(createUserDto.password);
    const newUser = await this.userModel.create(createUserDto);
    // Check if company name exists.
    // Create company
    // Check if user exists with email
    // Check if company exists
    // Create company with email
    // Check if company exists with this email
    return UserMapper.toDto(newUser);
  }
}
