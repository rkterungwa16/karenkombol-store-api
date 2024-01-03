import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder } from './seeder.interface';
import { Clothing } from '@product/clothing/schema';
import { categories } from './data/categories';

@Injectable()
export class CategoriesSeeder implements Seeder {
  constructor(
    @InjectModel(Clothing.name)
    private readonly category: Model<Clothing>,
  ) {}

  async seed(): Promise<any> {
    const data = await this.category.find();
    const modifiedCategories = categories.filter((_category) => {
      if (data.find((_c) => _c.name === _category.name)) return false;
      return true;
    });
    return this.category.insertMany(modifiedCategories);
  }

  async drop(): Promise<any> {
    const collectionExists = this.category.collection.collectionName;
    if (collectionExists) {
      return this.category.collection.drop();
    }
  }
}
