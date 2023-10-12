export interface ICategory {
  _id: string;
  imageUrl: string;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum CategoryTypes {
  JEANS_AND_DENIM = 'JEANS & DENIM',
  ATHLETIC_AND_ATHLEISURE = 'ATHLETIC & ATHLEISURE',
  DRESSES = 'DRESSES',
  SKIRTS = 'DRESSES',
  LOUNGEWEAR = 'LOUNGEWEAR',
  OUTERWEAR = 'OUTERWEAR',
  TROUSERS = 'TROUSERS',
  SHIRTS = 'SHIRTS',
  // TOPS_BLOUSES = 'TOPS & BLOUSES',
  SWIMWEAR = 'SWIMWEAR',
  UNDERWEAR_LINGERIE_SHAPEWEAR = 'UNDERWEAR, LINGERIE, & SHAPEWEAR',
}

export enum ShirtCategoryStyles {
  BODYSUIT = 'Bodysuit',
  TUNIC = 'Tunic',
  DRESS_SHIRT = 'Dress shirt',
  BLOUSE = 'Blouse',
  JACET_SHIRT = 'Jacket shirt',
  SHIRT_COAT = 'Shirt-coat',
  CHEMIZIER = 'Chemizier',
  SWEATSHIRT = 'Sweatshirt',
  WRAPOVER = 'Wrapover',
  NIGHT_SHIRT = 'Night shirt',
}

export enum ShirtCategoryFit {
  CLASSIC_FIT = 'Classic',
  SLIM_FIT = 'Slim',
  LOOSE_FIT = 'Loose',
  OVERSIZE = 'Oversize',
  ASYMMETRIC = 'Asymmetric',
}
