import { UserStatus } from '@user/enums';
import { createdCompany, createdRole } from '../../fixtures';

export type CreateUserProps = {
  email: string;
};

export class TestUserModel {
  create = jest.fn().mockResolvedValue({
    email: 'test@example.com',
    status: UserStatus.ACTIVE,
    company: createdCompany,
    role: [createdRole],
  });
  findAll = jest.fn();
  findOne = jest.fn();
  update = jest.fn();
  remove = jest.fn();
}
