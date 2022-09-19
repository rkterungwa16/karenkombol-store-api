import { createdCompany } from '../../fixtures';

export class TestCompanyModel {
  create = jest.fn().mockResolvedValue(createdCompany);
  findAll = jest.fn();
  findOne = jest.fn();
  update = jest.fn();
  remove = jest.fn();
}
// export const TestCompanyModel = {
//   find: jest.fn().mockReturnValue(customersArray),
//   findById: jest.fn(),
//   findByIdAndUpdate: jest.fn(),
//   findByIdAndRemove: jest.fn(),
//   new: jest.fn().mockResolvedValue(mockCustomer),
//   constructor: jest.fn().mockResolvedValue(mockCustomer),
//   create: jest.fn().mockResolvedValue(createdCompany),
//   findAll: jest.fn(),
//   findOne: jest.fn(),
//   update: jest.fn(),
//   remove: jest.fn(),
//   exec: jest.fn(),
//   populate: jest.fn(),
//   skip: jest.fn(),
//   offset: jest.fn(),
// }
