import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from '@auth/token.service';
import { ColorController } from './color.controller';
import { getModelToken } from '@nestjs/mongoose';
import {
  TestColorModel,
  TestPermissionModel,
  TestRoleModel,
  TestUserModel,
} from '../test/mocks';
import { ColorService } from './color.service';

describe('ColorController', () => {
  let controller: ColorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ColorController],
      providers: [
        TokenService,
        JwtService,
        ConfigService,
        ColorService,
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
          provide: getModelToken('Color'),
          useClass: TestColorModel,
        },
      ],
    }).compile();

    controller = module.get<ColorController>(ColorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
