import { Document } from 'mongoose';

export enum PermissionActions {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  // FULL_ACCESS = 'full_access',
}

export enum PermissionResources {
  ALL = 'all',
  ORDERS = 'orders',
  PRODUCTS = 'products',
  VARIANTS = 'variants',
  USERS = 'users',
  CUSTOMERS = 'customers',
  PERMISSIONS = 'permissions',
  ROLES = 'roles',
  ADDRESS = 'address',
  FULLFILLMENT = 'fullfillment',
  PAYMENT_METHOD = 'payment_method',
  CURRENCIES = 'currencies',
  INVOICE = 'invoice',
}

export interface IPermissions extends Document {
  readonly resource: string;
  readonly actions: PermissionActions[];
}
