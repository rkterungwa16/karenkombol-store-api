import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserResponseDto } from './dto';
import { User } from './schemas/user.schema';
import { UserMapper } from './user.mapper';
import { KKNotFoundException } from '@http/exceptions';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  public async fetchUserById(id: string): Promise<UserResponseDto> {
    const user = await this.userModel.findById(id).populate({
      path: 'role',
      model: 'Role',
      populate: {
        path: 'permissions',
        model: 'Permissions',
      },
    });
    if (!user) {
      throw new KKNotFoundException('user');
    }
    return UserMapper.toDto(user);
  }
}
