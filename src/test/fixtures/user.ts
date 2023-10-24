import { UserStatus } from '@enums';
import { createdCompany } from './company';
import { createdRole } from './role';

export const createdUser = {
  _id: 'user_12345',
  email: 'test@example.com',
  status: UserStatus.ACTIVE,
  company: createdCompany,
  role: [createdRole],
};
