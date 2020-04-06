📢 Use this project, [contribute](https://github.com/vtex-apps/condition-layout) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Condition Layout

The condition layout app allows to conditionally render a block given certain conditions.

## Configuration

The app exports three kinds of block:

- `condition-layout.{context}` - These blocks are responsible for holding your condition blocks and providing the appropriate context.
- `condition` - This blocks hold the condition logic and childrens to be displayed given the condition resolves to true.
- `condition.default` - This block can be used to render some content if no `condition` block was matched inside a `condition.layout`.

### `condition-layout`

Each variant of a `condition-layout` is responsible for providing the values to be used in comparisons by its subsequent `condition` blocks.

You should never use `condition-layout` directly. Make sure to always use a context variant, such as `condition-layout.product`.

#### `condition-layout.product`

The `condition-layout.product` block provides the subjects below to use in `condition` blocks.

| Subject           | Type    | Description                     |
| ----------------- | ------- | ------------------------------- |
| `productId`       | `value` | Id of the current product.      |
| `categoryId`      | `value` | Id of the current category.     |
| `brandId`         | `value` | Id of the current brand.        |
| `selectedItemId`  | `value` | Id of the current selected item |
| `productClusters` | `array` | List of product clusters.       |
| `categoryTree`    | `array` | List of categories.             |

### `condition`

| Prop name    | Type             | Description                                                            |
| ------------ | ---------------- | ---------------------------------------------------------------------- |
| `conditions` | `ConditionArray` | A list of conditions to be resolved                                    |
| `match`      | `MatchType`      | The condition list match type                                          |
| `children`   | `ReactNode`      | The `children` component(s) to be rendered when the condition matches. |

### Types

#### `ConditionArray`

| Prop name | Type            | Description                                        |
| --------- | --------------- | -------------------------------------------------- |
| `subject` | `string`        | Subject ID to get its value.                       |
| `verb`    | `ConditionVerb` | The condition operator.                            |
| `object`  | `string`        | The value to be compared with the subject's value. |

#### `ConditionVerb`

For subjects of type `value`, there are two verbs available:

| Type     | Description                                         |
| -------- | --------------------------------------------------- |
| `is`     | Checks for equality (default for `value` subjects). |
| `is-not` | Checks for inequality.                              |

For subjects of type `array`, there are two verbs available:

| Type               | Description                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------- |
| `contains`         | Checks if the subject's value contains the defined `object` (default for `array` subjects). |
| `does-not-contain` | Checks if the subject's value does NOT contain the defined `object`.                        |

#### `MatchType`

| Type   | Description                                                                       |
| ------ | --------------------------------------------------------------------------------- |
| `all`  | Resolves a list of conditions to `true` only if all conditions match (_default_). |
| `any`  | Resolves a list of conditions to `true` if any of the conditions match.           |
| `none` | Resolves a list of conditions to `true` if NONE condition match.                  |

### Examples

#### Checking for a specific product ID

```json
{
  "store.product": {
    "children": ["condition-layout.product"]
  },
  "condition-layout.product": {
    "children": [
        "condition#custom-pdp-12",
        "condition#custom-pdp-20",
    ]
  },
  "condition#custom-pdp-12": {
    "props": {
      "conditions": [
        {
          "subject": "productId",
          "verb": "is",
          "object": "12"
        },
      ]
    },
    "children": ["flex-layout.row#custom-pdp-layout-12"]
  },
  "condition#custom-pdp-20": {
    "props": {
      "conditions": [
        {
          "subject": "productId",
          "verb": "is",
          "object": "20"
        },
      ]
    },
    "children": ["flex-layout.row#custom-pdp-layout-20"]
  },
```
