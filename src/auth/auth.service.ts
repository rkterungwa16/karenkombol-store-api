import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HashHelper } from '@helpers';
import { CreateUserRequestDto, UserResponseDto } from '@user/dto';
import {
  KKUnauthorizedException,
  UnauthorizedErrorType,
} from '@http/exceptions';
import {
  AuthCredentialsRequestDto,
  JwtPayload,
  LoginResponseDto,
  TokenDto,
} from './dtos';
import { User } from '@user/schemas/user.schema';
import { TokenService } from './token.service';
import { UserStatus } from '@enums';
import { UserMapper } from '@user/user.mapper';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
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

    const userDto = await UserMapper.toDto(
      await (await user.populate('company')).populate('roles'),
    );

    const payload: JwtPayload = { id: userDto.id, email };
    const token = await this.tokenService.generateAuthToken(payload);

    return token;
  }
}
