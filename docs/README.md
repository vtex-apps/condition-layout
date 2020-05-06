📢 Use this project, [contribute](https://github.com/vtex-apps/condition-layout) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

# Condition Layout

The condition layout app allows to conditionally render a block given certain conditions.

![Screen-Recording-certo](https://user-images.githubusercontent.com/12139385/79379694-a8c99980-7f35-11ea-9f01-7021c6529332.gif)


## Configuration


### Step 1 - Adding the Condition Layout app to your theme's dependencies

In your theme's `manifest.json`, add the Product Price app as a dependency:

```json
"dependencies": {
  "vtex.condition-layout": "1.x"
}
```

### Step 2 - Adding the Condition Layout's blocks to your theme's templates

The `condition-layout` app exports two kinds of block: `condition-layout.{context}` and `condition.{context}`.

- `condition-layout.{context}` - These blocks are responsible for holding your condition blocks and providing the appropriate context.
- `condition.{context}` - These blocks hold the condition logic and children to be displayed given the condition resolves to true.
- `condition.else` - This block can be used to render some content if no `condition` block was matched inside a `condition.layout`. The usage of this block is optional. If no condition is matched and there's no `condition.else` declared, nothing will be shown.


### condition-layout

Each variant of a `condition-layout` is responsible for providing the values to be used in comparisons by its subsequent `condition` blocks.

You should never use `condition-layout` directly. Make sure to always use a context variant, such as `condition-layout.product`.

#### condition-layout.product

The `condition-layout.product` block provides the subjects below to use in `condition.{context}` blocks.

| Subject           | Type    | Description                           |
| ----------------- | ------- | ------------------------------------- |
| `productId`       | `value` | Id of the current product.            |
| `categoryId`      | `value` | Id of the current category.           |
| `brandId`         | `value` | Id of the current brand.              |
| `selectedItemId`  | `value` | Id of the current selected SKU |
| `productClusters` | `array` | List of product clusters.             |
| `categoryTree`    | `array` | List of categories.                   |

### condition.{context}

| Prop name    | Type             | Description                                                            |
| ------------ | ---------------- | ---------------------------------------------------------------------- |
| `conditions` | `ConditionArray` | A list of conditions to be resolved                                    |
| `match`      | `MatchType`      | The condition list match type                                          |
| `children`   | `ReactNode`      | The `children` component(s) to be rendered when the condition matches. |

### Types

#### ConditionArray

| Prop name | Type            | Description                                        |
| --------- | --------------- | -------------------------------------------------- |
| `subject` | `string`        | Subject ID to get its value.                       |
| `verb`    | `ConditionVerb` | The condition operator.                            |
| `object`  | `string`        | The value to be compared with the subject's value. |

#### ConditionVerb

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

#### MatchType

| Type   | Description                                                                       |
| ------ | --------------------------------------------------------------------------------- |
| `all`  | Resolves a list of conditions to `true` only if all conditions match (_default_). |
| `any`  | Resolves a list of conditions to `true` if any of the conditions match.           |
| `none` | Resolves a list of conditions to `true` if NONE condition match.                  |


## Example

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
        "condition.else"
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
  
  "condition.else": {
    "children": ["flex-layout.row#default"]
  }
  
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!