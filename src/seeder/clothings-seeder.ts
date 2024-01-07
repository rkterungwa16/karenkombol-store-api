import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder } from './seeder.interface';
import { Clothing } from '@product/clothing/schema';
import { clothings } from './data/clothings';

@Injectable()
export class ClothingsSeeder implements Seeder {
  constructor(
    @InjectModel(Clothing.name)
    private readonly clothing: Model<Clothing>,
  ) {}

  async seed(): Promise<any> {
    const data = await this.clothing.find();
    const modifiedClothings = clothings.filter((_clothing) => {
      if (data.find((_c) => _c.name === _clothing.name)) return false;
      return true;
    });
    return this.clothing.insertMany(modifiedClothings);
  }

  async drop(): Promise<any> {
    const collectionExists = this.clothing.collection.collectionName;
    if (collectionExists) {
      return this.clothing.collection.drop();
    }
  }
}
