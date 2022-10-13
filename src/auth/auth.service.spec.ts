import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { HashHelper } from '@helpers';
import { DatabaseModule } from '@database/database.module';
import {
  InvalidCredentialsException,
  DisabledUserException,
} from '@http/exceptions';
import { ErrorType } from '@http/error-type';
import { TestUserModel } from '../test/mocks';

import { User } from '@user/schemas/user.schema';

import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { UserStatus } from '@enums';

describe('AuthService', () => {
  let service: AuthService;
  let tokenService: TokenService;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        TokenService,
        JwtService,
        ConfigService,
        {
          provide: getModelToken('User'),
          useClass: TestUserModel,
        },
      ],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        DatabaseModule,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    model = module.get<Model<User>>(getModelToken('User'));
    tokenService = module.get<TokenService>(TokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should login user successfully', async () => {
    const exampleLoggedInUser = {
      companyName: 'example',
      email: 'test@example.com',
      password: '@Test12345',
    };
    jest.spyOn(model, 'findOne').mockReturnValueOnce({
      populate: jest.fn().mockReturnThis(),
      ...exampleLoggedInUser,
      password: await HashHelper.encrypt('@Test12345'),
    } as any);
    jest.spyOn(tokenService, 'generateAuthToken').mockReturnValue({
      accessToken: 'loggedToken',
      accessTokenExpires: 1,
      tokenType: '',
      refreshToken: '',
    });
    const createdUser = await service.login({
      ...exampleLoggedInUser,
    });

    expect(createdUser.accessToken).toEqual('loggedToken');
  });

  it('should not login user with invalid credentials', async () => {
    const exampleLoggedInUser = {
      companyName: 'example',
      email: 'test@example.com',
      password: '@Wrong1234',
    };
    jest.spyOn(model, 'findOne').mockReturnValueOnce({
      populate: jest.fn().mockReturnThis(),
      ...exampleLoggedInUser,
      password: await HashHelper.encrypt('@Test12345'),
    } as any);

    await expect(
      service.login({
        ...exampleLoggedInUser,
      }),
    ).rejects.toThrow(new InvalidCredentialsException());
  });
  it('should not login an inactive user', async () => {
    const exampleLoggedInUser = {
      companyName: 'example',
      email: 'test@example.com',
      password: '@Test12345',
      status: UserStatus.INACTIVE,
    };
    jest.spyOn(model, 'findOne').mockReturnValueOnce({
      populate: jest.fn().mockReturnThis(),
      ...exampleLoggedInUser,
      password: await HashHelper.encrypt('@Test12345'),
    } as any);

    await expect(
      service.login({
        ...exampleLoggedInUser,
      }),
    ).rejects.toThrow(new DisabledUserException(ErrorType.InactiveUser));
  });

  it('should not login a blocked user', async () => {
    const exampleLoggedInUser = {
      companyName: 'example',
      email: 'test@example.com',
      password: '@Test12345',
      status: UserStatus.BLOCKED,
    };
    jest.spyOn(model, 'findOne').mockReturnValueOnce({
      populate: jest.fn().mockReturnThis(),
      ...exampleLoggedInUser,
      password: await HashHelper.encrypt('@Test12345'),
    } as any);

    await expect(
      service.login({
        ...exampleLoggedInUser,
      }),
    ).rejects.toThrow(new DisabledUserException(ErrorType.BlockedUser));
  });
});
