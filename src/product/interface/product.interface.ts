import { IClothing } from '@product/clothing/interface/clothing.interface';

export interface IProduct {
  _id: string;
  imageUrl: string;
  name: string;
  description: string;
  category: string | IClothing;
  published: boolean;
  status: ProductStatus;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export enum ProductStatus {
  Active = 'ACTIVE',
  InActive = 'INACTIVE',
}
