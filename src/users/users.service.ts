import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserRequestDto, UserResponseDto } from './dto';
import { User } from './schemas/user.schema';
import { UserMapper } from './user.mapper';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  public async create(
    createUserDto: CreateUserRequestDto,
  ): Promise<UserResponseDto> {
    const newUser = await this.userModel.create(createUserDto);
    return UserMapper.toDto(newUser);
  }
}
