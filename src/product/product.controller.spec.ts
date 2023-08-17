import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { TokenService } from '@auth/token.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CategoryService } from './category/category.service';
import { getModelToken } from '@nestjs/mongoose';
import {
  TestCategoryModel,
  TestPermissionModel,
  TestProductModel,
  TestRoleModel,
  TestUserModel,
} from '../test/mocks';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        TokenService,
        JwtService,
        ConfigService,
        CategoryService,
        ProductService,
        {
          provide: getModelToken('User'),
          useClass: TestUserModel,
        },
        {
          provide: getModelToken('Category'),
          useClass: TestCategoryModel,
        },
        {
          provide: getModelToken('Category'),
          useClass: TestCategoryModel,
        },
        {
          provide: getModelToken('Role'),
          useClass: TestRoleModel,
        },
        {
          provide: getModelToken('Permission'),
          useClass: TestPermissionModel,
        },
        {
          provide: getModelToken('Product'),
          useClass: TestProductModel,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
