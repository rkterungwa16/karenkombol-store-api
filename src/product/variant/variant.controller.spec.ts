import { Test, TestingModule } from '@nestjs/testing';
import { VariantController } from './variant.controller';

describe('VariantController', () => {
  let controller: VariantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VariantController],
    }).compile();

    controller = module.get<VariantController>(VariantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
