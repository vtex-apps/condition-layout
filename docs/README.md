📢 Use this project, [contribute](https://github.com/vtex-apps/condition-layout) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Condition Layout

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

As the name implies, the Condition Layout app allows a block to be rendered if certain conditions are met.

![Screen-Recording-certo](https://user-images.githubusercontent.com/12139385/79379694-a8c99980-7f35-11ea-9f01-7021c6529332.gif)

## Configuration

### Step 1 - Adding the Condition Layout app to your theme's dependencies

In your theme's `manifest.json`, add the Condition Layout app as a dependency:

```diff
  "dependencies": {
+   "vtex.condition-layout": "2.x"
  }
```

You are now able to use all blocks that are exported by the `condition-layout` app. Check out the full list below:

| Block name                 | Description                                                                                                                  |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `condition-layout.product` | Defines the condition logic and the children blocks that are going to be rendered in case the predefined conditions are met. |

### Step 2 - Adding the `condition-layout.{context}` block to your theme's templates

In the product theme template, add the `condition-layout.{context}` block, replacing the `{context}` value with `product`. For example:

```
{
  "store.product": {
    "children": ["condition-layout.product"]
  },
```

:warning: _You should never use `condition-layout` directly. Make sure to always use it with the context variant, such as `condition-layout.product`._

### Step 3 - Defining the desired conditions

Now it is time to configure the `condition-layout.product` block: **use the block's props to define your layout condition** and declare as its child a block of your choosing that will be rendered if this condition is met. For example:

```diff
{
  "store.product": {
    "children": ["condition-layout.product#cond1"]
  },
  "condition-layout.product#cond1": {
+   "props": {
+     "conditions": [
+       {
+         "subject": "productId",
+         "arguments": {
+           "id": "12"
+         }
+       },
+     ]
+   },
+   "Then": "flex-layout.row#custom-pdp-layout-12",
+   "Else": "flex-layout.row#default"
+ },
```

According to the example above, whenever users interact with a product whose ID is equal to 12, the block `flex-layout.row#custom-pdp-layout-12` is rendered.

If users interact with a product whose ID is not equal to 12, the block that is rendered is the `flex-layout.row#default`.

#### `condition-layout.{context}` props

| Prop name    | Type     | Description                                                                                                                                                                                                                                                       | Default value |
| ------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `conditions` | `object` | List of desired conditions.                                                                                                                                                                                                                                       | `undefined`   |
| `match`      | `enum`   | Layout rendering criteria. Possible values are: `all` (all conditions must be matched in order to be rendered), `any` (at least one of the conditions must be matched in order to be rendered) or `none` (no conditions must be matched in order to be rendered). | `all`         |
| `Then`       | `block`  | Name of the block to be rendered when the conditions match. If not defined, `children` is used.                                                                                                                                                                   | `undefined`   |
| `Else`       | `block`  | Name of the block to be rendered when the conditions do not match.                                                                                                                                                                                              | `undefined`   |

**`conditions` prop's object:**

| Prop name   | Type     | Description                                                                                                                                                                                                                                                                                                  | Default value |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| `subject`   | `string` | A subject is a similar data fetched from a given context. When passed as a value to this prop, the subject will be used to identify which data is needed from the UI to validate the value chosen in the `object` prop. Check below the possible value for the subject prop provided by the product context. | `undefined`   |
| `arguments` | `string` | An object that configures the condition parameters.                                                                                                                                                                                                                                                          | `undefined`   |

##### `condition-layout.product`

- Possible `subject` prop's values provided by the `product` context:

| Subject                    | Description                                                                                               | Arguments                                                                                                    |
| -------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `productId`                | Product's IDs displayed on the UI.                                                                        | `{ id: string }`                                                                                             |
| `categoryId`               | Category's IDs displayed on the UI.                                                                       | `{ id: string }`                                                                                             |
| `brandId`                  | Brand's IDs displayed on the UI.                                                                          | `{ id: string }`                                                                                             |
| `selectedItemId`           | ID of the item being selected by the user on the UI.                                                      | `{ id: string }`                                                                                             |
| `productClusters`          | List of product clusters on the UI.                                                                       | `{ id: string }`                                                                                             |
| `categoryTree`             | List of categories on the UI.                                                                             | `{ id: string }`                                                                                             |
| `specificationProperties`  | List of product specifications.                                                                           | `{ name: string, value?: string }`. Value is optional, if omitted, only the specification `name` is checked. |
| `areAllVariationsSelected` | Whether all product variations available on the page were selected by the user (`true`) or not (`false`). | No arguments.                                                                                                |

## Modus Operandi

The `condition-layout.{context}` uses the `conditions` and `match` props to set the conditions that blocks must meet to be rendered or not.

The `conditions` object has two props, namely `subject` and `arguments`, that together define one condition that must match. Each `subject` has an underlying validation method executed whenever its `subject` is used. The `arguments` object can be considered arguments being sent to the underlying method.

Lastly, the `match` prop decides the necessary number of valid conditions (defined in `condition-layout.{context}` blocks) for the layout rendering to actually occur.

## Customization

The Condition Layout merely establishes a logic to render other blocks. Therefore, the app doesn't have CSS Handles for its specific customization.

Instead, you should use the Handles of the child blocks chosen for rendering.

<!-- DOCS-IGNORE:start -->

## Contributors ✨

Thanks goes out to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/LucasCastroAcctGlobal"><img src="https://avatars0.githubusercontent.com/u/55210107?v=4" width="100px;" alt=""/><br /><sub><b>LucasCastroAcctGlobal</b></sub></a><br /><a href="https://github.com/vtex-apps/condition-layout/commits?author=LucasCastroAcctGlobal" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!

<!-- DOCS-IGNORE:end -->
