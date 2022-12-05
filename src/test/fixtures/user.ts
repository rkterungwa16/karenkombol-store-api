import { UserStatus } from '@enums';
import { IUser } from '@user/interface/user.interface';
import { createdCompany } from './company';
import { createdRole } from './role';

export const createdUser: IUser = {
  _id: 'user_12345',
  email: 'test@example.com',
  status: UserStatus.ACTIVE,
  company: createdCompany,
  role: [createdRole],
};
