export enum PermissionActionsTypes {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  // FULL_ACCESS = 'full_access',
}

export enum PermissionResources {
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
  COLORS = 'colors',
  SIZE = 'size',
  CATEGORY = 'category',
  SHIRT = 'shirt',
}

export interface IPermission {
  readonly _id: string;
  readonly resource: string;
  readonly actions: PermissionActionsTypes[];
  createdAt?: Date;
  updatedAt?: Date;
}
