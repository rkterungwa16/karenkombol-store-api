import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HashHelper } from '@helpers';
import { CreateUserRequestDto, UserResponseDto } from '@user/dto';
import {
  InvalidCredentialsException,
  DisabledUserException,
} from '@http/exceptions';
import {
  AuthCredentialsRequestDto,
  JwtPayload,
  LoginResponseDto,
} from './dtos';
import { User } from '@user/schemas/user.schema';
import { TokenService } from './token.service';
import { UserStatus } from '@user/enums';
import { UserMapper } from '@user/user.mapper';
import { ErrorType } from '@http/error-type';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private tokenService: TokenService,
  ) {}

  public async login({
    email,
    password,
  }: AuthCredentialsRequestDto): Promise<LoginResponseDto> {
    const user = await this.userModel.findOne({
      email,
    });

    const userDto = await UserMapper.toDto(user);

    if (!user) {
      throw new InvalidCredentialsException();
    }

    const passwordMatch = await HashHelper.compare(password, user.password);

    if (!passwordMatch) {
      throw new InvalidCredentialsException();
    }
    if (user.status == UserStatus.BLOCKED) {
      throw new DisabledUserException(ErrorType.BlockedUser);
    }
    if (user.status == UserStatus.INACTIVE) {
      throw new DisabledUserException(ErrorType.InactiveUser);
    }

    const payload: JwtPayload = { id: userDto.id, email };
    const token = await this.tokenService.generateAuthToken(payload);

    return {
      user: userDto,
      token,
    };
  }
}
