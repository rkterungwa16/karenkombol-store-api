import { ClothingTypes } from '@product/clothing/interface/clothing.interface';

export const clothings = [
  {
    name: ClothingTypes.SHIRTS,
    description: `
      A shirt is a piece of clothing worn on the upper body. It traditionally has a front placket at the center front with a button opening, so that the shirt can be put on and buttoned up.

      Shirts are worn as casual wear and evening wear by both men and women.
    `,
  },
  {
    name: ClothingTypes.SKIRTS,
    description: `
      A skirt is another type of clothes worn on the lower body. They can be made from any fabric that you can think of, come in long, midi, mini and micro lengths, as well as many different styles.
    `,
  },
  {
    name: ClothingTypes.DRESSES,
    description: `
      A dress is a garment which hangs from the shoulders, covering the upper body area, buttocks and thighs. It can be close fitting or loose and airy.

      Stylistic variations mean that dresses can also be strapless, which requires them to be closely fitted to the upper bodice, and can also fall to any length between thigh and floor.
    `,
  },
  {
    name: ClothingTypes.TROUSERS,
    description: `
      Trousers, slacks, or pants are an item of clothing worn from the waist to anywhere between the knees and the ankles, covering both legs separately. In the United Kingdom, the word pants generally means underwear and not trousers.
    `,
  },
  {
    name: ClothingTypes.SHORTS,
    description: `
      Shorts are a garment worn over the pelvic area, circling the waist and splitting to cover the upper part of the legs, sometimes extending down to the knees but not covering the entire length of the leg.
    `,
  },
];
