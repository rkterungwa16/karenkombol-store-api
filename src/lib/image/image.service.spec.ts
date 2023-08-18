import { Test, TestingModule } from '@nestjs/testing';
import { ImageService } from './image.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { getModelToken } from '@nestjs/mongoose';
import {
  TestUserModel,
  TestCategoryModel,
  TestImageModel,
} from '../../test/mocks';
import { ConfigureCloudinaryModule } from '../cloudinary/configure.cloudinary.service';

describe('ImageService', () => {
  let service: ImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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

    service = module.get<ImageService>(ImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
