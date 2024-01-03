import { TokenService } from '@auth/token.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import {
  TestUserModel,
  TestPermissionModel,
  TestRoleModel,
  TestCurrencyModel,
} from '../../test/mocks';
import { ClothingController } from './clothing.controller';
import { ClothingService } from './clothing.service';

describe('ClothingController', () => {
  let controller: ClothingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClothingController],
      providers: [
        TokenService,
        JwtService,
        ConfigService,
        ClothingService,
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
          provide: getModelToken('Clothing'),
          useClass: TestCurrencyModel,
        },
      ],
    }).compile();

    controller = module.get<ClothingController>(ClothingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
