export interface ICategory {
  _id: string;
  imageUrl: string;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum ClothingTypes {
  JEANS_AND_DENIM = 'jeans & denim',
  ATHLETIC_AND_ATHLEISURE = 'athletic & athleisure',
  DRESSES = 'dress',
  SKIRT = 'skirt',
  LOUNGEWEAR = 'loungewear',
  OUTERWEAR = 'outerwear',
  TROUSERS = 'trousers',
  SHIRT = 'shirt',
  // TOPS_BLOUSES = 'TOPS & BLOUSES',
  SWIMWEAR = 'swimwear',
  UNDERWEAR_LINGERIE_SHAPEWEAR = 'underwear, lingerie, & shapewear',
}
