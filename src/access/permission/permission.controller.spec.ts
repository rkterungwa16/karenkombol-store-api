import { TokenService } from '@auth/token.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import {
  TestUserModel,
  TestPermissionModel,
  TestRoleModel,
} from '../../test/mocks';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';

describe('PermissionsController', () => {
  let controller: PermissionController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionController],
      providers: [
        TokenService,
        JwtService,
        ConfigService,
        PermissionService,
        {
          provide: getModelToken('User'),
          useClass: TestUserModel,
        },
        {
          provide: getModelToken('Permission'),
          useClass: TestPermissionModel,
        },
        {
          provide: getModelToken('Role'),
          useClass: TestRoleModel,
        },
      ],
    }).compile();
    controller = module.get<PermissionController>(PermissionController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
