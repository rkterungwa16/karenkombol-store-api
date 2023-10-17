import {
  ClothingTypes,
  ShirtFits,
  ShirtStyles,
} from '@product/category/interface/category.interface';

export const categories = [
  {
    name: '',
    description: '',
    clothing: ClothingTypes.SHIRT,
    style: ShirtStyles.TUNIC,
    fit: ShirtFits.LOOSE_FIT,
  },
  {
    clothing: ClothingTypes.SHIRT,
    style: ShirtStyles.TUNIC,
    fit: ShirtFits.CLASSIC_FIT,
  },
];
