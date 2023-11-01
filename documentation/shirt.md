# Shirts

Shirts

- [Create a shirt](#create-a-shirt)

## Create a shirt

### Steps to create a shirt

- Select the shirt style from a list of styles (via search style).
- Select collar type for this style of shirt from a list of collars
- Select fit for this style of shirt from a list of fits.
- Select sleeve for this style of shirt from a list of sleeves.
- A unique shirt has its style, fit, fabric, sleeves combined unique.
- No two shirts should have the exact same combination of all 4 properties.

```bash
POST /api/v1/shirts
```

#### Request body

| Name                  | Type                | Description                               |
| --------------------- | ------------------- | ----------------------------------------- |
| `style`               | `string`            | -                                         |
| `description`         | `string`            | -                                         |
| `fit`                 | `string`            | -                                         |
| `image`               | `string`            | -                                         |
| `collar`              | `string`            | -                                         |
| `sleeve`              | `string`            | -                                         |
