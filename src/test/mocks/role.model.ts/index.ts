import { createdRole } from '../../fixtures';

export class TestRoleModel {
  create = jest.fn().mockResolvedValue(createdRole);
  findAll = jest.fn();
  findOne = jest.fn();
  update = jest.fn();
  remove = jest.fn();
}
