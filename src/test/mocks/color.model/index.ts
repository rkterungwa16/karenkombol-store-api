import { createdColor } from '../../fixtures';

export class TestColorModel {
  create = jest.fn().mockResolvedValue(createdColor);
  findAll = jest.fn();
  findOne = jest.fn();
  update = jest.fn();
  remove = jest.fn();
  find = jest.fn().mockReturnValue([createdColor]);
  findById = jest.fn();
  findByIdAndUpdate = jest.fn();
}
