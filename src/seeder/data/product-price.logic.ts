const currencies = [
  {
    id: 'eee4a340-2e02-471d-aaf3-debe335e08dc',
    code: 'USD',
    symbol: '$',
    rate: 0.0011,
  },
  {
    id: 'e38a6d7d-8320-4376-bf6a-6b8094cb5685',
    code: 'EUR',
    symbol: '€',
    rate: 0.001,
  },
  {
    id: 'ba9b0c30-4bdd-4e9e-9221-eeb3bc1af6f4',
    code: 'JPY',
    symbol: '¥',
    rate: 0.16,
  },
  {
    id: 'ba9b0c30-4bdd-4e9e-9221-eeb3bc1af645',
    code: 'NGN',
    symbol: '₦',
    rate: 1,
  },
  {
    id: 'ba9b0c30-4bdd-4e9e-9221-eeb3bc1af321',
    code: 'GBP',
    symbol: '£',
    rate: 0.00087,
  },
];

const product = {
  id: '04a78427-b099-4e6d-b366-86c6c53437d0',
  name: 'Cotton Mix Zip-Up Hoodie',
  category: '5c053fa7-9d38-444d-9f0a-2efacb6387c7',
  brand: '84fab0cc-97c0-487f-a34e-fee052d94fd0',
  description:
    'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
  sizes: [
    { id: '99b2df73-e6ca-4c5f-840c-8921fac01a8c', size: '6' },
    { id: '0e9e16ed-dedc-4694-be08-073c82d4aef7', size: '8' },
    { id: '6e034d55-0289-4b26-943e-c8c1b925b2eb', size: '10' },
    { id: '54b844b4-26df-4171-a4ca-2e3144522c18', size: '12' },
  ],
  price: {
    productId: '',
    baseCurrency: 'ba9b0c30-4bdd-4e9e-9221-eeb3bc1af645',
    value: 7000,
  },
  // price: [
  //   {
  //     currency: "eee4a340-2e02-471d-aaf3-debe335e08dc",
  //     amount: 50,
  //   },
  //   {
  //     currency: "e38a6d7d-8320-4376-bf6a-6b8094cb5685",
  //     amount: 51.5,
  //   },
  //   {
  //     currency: "ba9b0c30-4bdd-4e9e-9221-eeb3bc1af6f4",
  //     amount: 7169,
  //   },
  // ],
};

// product price is dollars
// product price is in USD
const price =
  product.price.value * (currencies.find((c) => c.code === 'USD')?.rate || 1);

// When we change base currency do the following
// 1. Update all of the currency models with the current rates
// 2. Update all of the product prices with the calculated rate of the new base currency. And update base currency.
//    - Example
//      - If current base currency is NGN and price is 7000
//      - To change base currency to USD, convert product price to dollars using currant rate.
//      - Update product price to 7000 * 0.0011 = 70.00
//      - Update base currency to USD
//      - Update USD currency rate to 1 and calculate equivalent rates for all other currencies against the USD.
