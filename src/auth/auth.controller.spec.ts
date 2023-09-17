import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import {
  TestCompanyModel,
  TestPermissionModel,
  TestRoleModel,
  TestUserModel,
} from '../test/mocks';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        TokenService,
        JwtService,
        ConfigService,
        {
          provide: getModelToken('User'),
          useClass: TestUserModel,
        },
        {
          provide: getModelToken('Company'),
          useClass: TestCompanyModel,
        },
        {
          provide: getModelToken('Role'),
          useClass: TestRoleModel,
        },
        {
          provide: getModelToken('Permission'),
          useClass: TestPermissionModel,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
