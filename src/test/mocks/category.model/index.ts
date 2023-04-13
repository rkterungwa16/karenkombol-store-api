import { createdCategory } from '../../fixtures';

export class TestCategoryModel {
  create = jest.fn().mockResolvedValue(createdCategory);
  findAll = jest.fn();
  findOne = jest.fn();
  update = jest.fn();
  remove = jest.fn();
  find = jest.fn().mockReturnValue([createdCategory]);
  findById = jest.fn();
  findByIdAndUpdate = jest.fn();
}
