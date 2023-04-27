# Karen Kombol Store Api

## Getting Started

Clone the repo:

```bash
git clone https://github.com/rkterungwa16/karenkombol-store-api.git
cd karenkombol-store-api 
```

Install dependencies:
```bash
npm i
```

Set environment variables:

```bash
cp .env.example .env
```

Generate resources
```bash
nest generate <schematic> <name>
# example
nest generate service currency

nest generate module product/product-size

nest generate controller product/product-size

nest generate service product/product-size 
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
