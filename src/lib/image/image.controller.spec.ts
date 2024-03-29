import { Test, TestingModule } from '@nestjs/testing';
import { ImageController } from './image.controller';
import { TokenService } from '@auth/token.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import {
  TestCategoryModel,
  TestImageModel,
  TestUserModel,
} from '../../test/mocks';
import { ImageService } from './image.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ConfigureCloudinaryModule } from '../cloudinary/configure.cloudinary.service';

describe('ImageController', () => {
  let controller: ImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageController],
      providers: [
        TokenService,
        JwtService,
        ConfigService,
        ImageService,
        CloudinaryService,
        {
          provide: getModelToken('User'),
          useClass: TestUserModel,
        },
        {
          provide: getModelToken('Category'),
          useClass: TestCategoryModel,
        },
        {
          provide: getModelToken('Image'),
          useClass: TestImageModel,
        },
        ...ConfigureCloudinaryModule.register().providers,
      ],
    }).compile();

    controller = module.get<ImageController>(ImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
