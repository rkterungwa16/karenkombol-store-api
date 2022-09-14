import { Document } from 'mongoose';

export enum UserStatus {
  ACTIVE = 'active',
  BLOCKED = 'blocked',
  INACTIVE = 'inactive',
}

export enum UserRoles {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
}

export interface IUser extends Document {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly company: string;
  // readonly account: string;
  readonly avatar: string;
  readonly status: UserStatus;
  // readonly createdAt: string;
  // readonly updatedAt: string;
  readonly roles: string[];
}

/**
 * Assign super admin to first user that creates the account.
 * Default roles are super-admin and staff roles.
 * Super admin sends invite to other users with a default staff role.
 * Super admin can create more roles like admin, members etc.
 * Super admin role will have a default permission for full access.
 * Staff role will have no permissions as default.
 * Super admin can create permissions for staff role.
 * Super admin can create permissions for all roles.
 * Super admin can assign multiple roles to a user.
 */

/**
 * Assign super admin to first user that creates the account.
 * What are decorators
 * How decorators are used in nestjs example. DTO, inject model.
 */
