import { ICategory } from '@product/category/interface/category.interface';

export interface IProduct {
  _id: string;
  imageUrl: string;
  name: string;
  description: string;
  category: string | ICategory;
  published: boolean;
  status: ProductStatus;
  tags: string[];
}

export enum ProductStatus {
  Active = 'ACTIVE',
  InActive = 'INACTIVE',
}