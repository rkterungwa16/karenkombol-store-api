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
} from '../test/mocks';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from './currency.service';

describe('CurrencyController', () => {
  let controller: CurrencyController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrencyController],
      providers: [
        TokenService,
        JwtService,
        ConfigService,
        CurrencyService,
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
          provide: getModelToken('Currency'),
          useClass: TestCurrencyModel,
        },
      ],
    }).compile();
    controller = module.get<CurrencyController>(CurrencyController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
