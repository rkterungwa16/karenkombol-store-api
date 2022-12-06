import { TokenService } from '@auth/token.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import {
  TestUserModel,
  TestPermissionModel,
  TestRoleModel,
  TestCompanyModel,
} from '../../test/mocks';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

describe('RolesController', () => {
  let controller: RoleController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleController],
      providers: [
        TokenService,
        JwtService,
        ConfigService,
        RoleService,
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
        {
          provide: getModelToken('Company'),
          useClass: TestCompanyModel,
        },
      ],
    }).compile();
    controller = module.get<RoleController>(RoleController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
