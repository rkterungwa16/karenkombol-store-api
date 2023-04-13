import { createdCurrency } from '../../fixtures';

export class TestProductModel {
  create = jest.fn().mockResolvedValue(createdCurrency);
  findAll = jest.fn();
  findOne = jest.fn();
  update = jest.fn();
  remove = jest.fn();
  find = jest.fn().mockReturnValue([createdCurrency]);
  findById = jest.fn();
  findByIdAndUpdate = jest.fn();
}
