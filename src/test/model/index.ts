import { Model } from 'mongoose';
import { Size } from '@size/schema/size.schema';

export const setModelData = <T>(model: Model<T>) => {
  return {
    async reset() {
      return await model.deleteMany();
    },
    async populate(data) {
      return await model.create(data);
    },
    async populateMany(data) {
      return await model.insertMany(data);
    },
  };
};
