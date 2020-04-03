`📢 Use this project, [contribute](https://github.com/{OrganizationName/{AppName}) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).`

# Condition Layout

The condition layout app allows to conditionally render a block given certain conditions.

## Configuration

The app exports two kinds of block:

- `condition-layout.{context}` - These blocks are responsible for holding your condition blocks and providing the appropriate context.
- `condition` - This blocks hold the condition logic and childrens to be displayed given the condition resolves to true.

You should never use `condition-layout` directly. Make sure to always use a context variant, such as `condition-layout.product`.

### `condition-layout.{...}`

Each variant of a `condition-layout` is responsible for providing the values to be used in comparisons by its subsequent `condition` blocks.

#### `condition-layout.product`

| Subject           | Type    | Description                     |
| ----------------- | ------- | ------------------------------- |
| `productId`       | `value` | Id of the current product.      |
| `categoryId`      | `value` | Id of the current category.     |
| `brandId`         | `value` | Id of the current brand.        |
| `selectedItemId`  | `value` | Id of the current selected item |
| `productClusters` | `array` | List of product clusters.       |
| `categoryTree`    | `array` | List of categories.             |

### `condition`

| Prop name    | Type             | Description                         |
| ------------ | ---------------- | ----------------------------------- |
| `conditions` | `ConditionArray` | A list of conditions to be resolved |
| `matching`   | `MatchType`      | The condition list match type       |

#### `ConditionArray`

| Prop name | Type            | Description                                        |
| --------- | --------------- | -------------------------------------------------- |
| `subject` | `string`        | Subject ID to get its value.                       |
| `verb`    | `ConditionVerb` | The condition operator.                            |
| `object`  | `string`        | The value to be compared with the subject's value. |

#### `ConditionVerb`

For subjects of type `value`, there are two verbs available:

- `is` - Checks for equality.
- `is-not` - Checks for inequality.

For subjects of type `array`, there are two verbs available:

- `contains` - Checks if the subject's value contains the defined `object`.
- `does-not-contain` - Checks if the subject's value does NOT contain the defined `object`.

#### `MatchType`

| Type   | Description                                                             |
| ------ | ----------------------------------------------------------------------- |
| `all`  | Resolves a list of conditions to `true` only if all conditions match.   |
| `any`  | Resolves a list of conditions to `true` if any of the conditions match. |
| `none` | Resolves a list of conditions to `true` if NONE condition match.        |

---

Check out some documentation models that are already live:

- [Breadcrumb](https://github.com/vtex-apps/breadcrumb)
- [Image](https://vtex.io/docs/components/general/vtex.store-components/image)
