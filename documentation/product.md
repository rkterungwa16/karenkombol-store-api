# Products

Products

- [Create a product](#create-a-product)

## Create a product

### Steps to create a product

- Select a category from a list of categories. You can search for a category via api. Example category is shirt.
  - A selected category gives you a list of associated items. Example, a shirt category gives you a list of shirts under that category.
  - If a shirt category is selected, pick the style(type) of shirt for this product.
  - Note that the list of shirts varies with the style, fit, sleeve, fabric, and collar.
    - Filter based on these properties and select the shirt that describes this product(style) based on the properties.
  - Select the type of fit for the selected shirt style.
  - Select the type of sleeve for the selected shirt style.
  - Select the type of collar for the selected shirt style.
  - Select the fabric for the selected shirt style.
  - What is an example of a product?
    - *loose tunic shirt made of cotton with standard collar.*
  - After creating the product with the above properties, create the variants for this product next.
  - Select the properties for the variant of this style of shirt.
    - Select size for the selected shirt style.
    - Select the color(s) for the selected shirt style.
    - Add price for the particular variant. Product prices vary based on size and color.
-

```bash
POST /api/v1/products
```

#### Request body

| Name                  | Type                | Description                               |
| --------------------- | ------------------- | ----------------------------------------- |
| `name`                | `string`            | -                                         |
| `description`         | `string`            | -                                         |
| `shirt`               | `string`            | -                                         |
| `category`            | `string`            | -                                         |
| `variants`            | `array` of `string` | -                                         |
| `tags`                | `array` of `string` | -                                         |
| `status`              | `boolean`           | -                                         |
| `published`           | `boolean`           | -                                         |
| `slug`                | `string`            | -                                         |
