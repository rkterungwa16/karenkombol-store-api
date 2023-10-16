import {
  ClothingTypes,
  ShirtFits,
  ShirtStyles,
} from '@product/category/interface/category.interface';

export const categories = [
  {
    name: '',
    description: '',
    clothing: ClothingTypes.SHIRTS,
    style: ShirtStyles.TUNIC,
    fit: ShirtFits.LOOSE_FIT,
  },
  {
    clothing: ClothingTypes.SHIRTS,
    style: ShirtStyles.TUNIC,
    fit: ShirtFits.CLASSIC_FIT,
  },
];
