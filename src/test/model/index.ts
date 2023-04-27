import { Model } from 'mongoose';

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
