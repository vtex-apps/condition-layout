<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [From `1.x.x` to `2.x.x`](#from-1xx-to-2xx)
  - [Blocks](#blocks)
  - [Condition grammar](#condition-grammar)
  - [Negating conditions](#negating-conditions)

<!-- /code_chunk_output -->

## From `1.x.x` to `2.x.x`

### Blocks

In **`1.x.x`**, the `condition-layout` app exported three different types of blocks:

- `condition-layout.{context}` - Wrapper and controller of its children conditions.
- `condition.{context}` - Actual condition blocks.
- `condition.else` - If no condition matches inside a `condition-layout`, the `condition.else` would be rendered.

```json
{
  "store.product": {
    "children": ["condition-layout.product"]
  },
  "condition-layout.product": {
    "children": [
      "condition.product#custom-pdp-12",
      "condition.product#custom-pdp-20",
      "condition.else"
    ]
  },
  "condition.product#custom-pdp-12": {
    "props": {
      "conditions": [
        {
          "subject": "productId",
          "verb": "is",
          "object": "12"
        }
      ]
    },
    "children": ["flex-layout.row#custom-pdp-layout-12"]
  },
  "condition.product#custom-pdp-20": {
    "props": {
      "conditions": [
        {
          "subject": "productId",
          "verb": "is",
          "object": "20"
        }
      ]
    },
    "children": ["flex-layout.row#custom-pdp-layout-20"]
  },

  "condition.else": {
    "children": ["flex-layout.row#default"]
  }
}
```

In **`2.x.x`**, this was simplified and now all the three kinds of blocks were merged into one called `condition-layout.{context}`.

The same block structure above can now be rewritten as:

```json
{
  "store.product": {
    "children": ["condition-layout.product#custom-pdp-12"]
  },
  "condition-layout.product#custom-pdp-12": {
    "props": {
      "conditions": [
        {
          "subject": "productId",
          "arguments": { "id": "12" }
        }
      ],
      "Then": "flex-layout.row#custom-pdp-layout-12",
      "Else": "condition-layout.product#custom-pdp-20"
    }
  },
  "condition-layout.product#custom-pdp-20": {
    "props": {
      "conditions": [
        {
          "subject": "productId",
          "arguments": { "id": "20" }
        }
      ]
    },
    "Then": "flex-layout.row#custom-pdp-layout-20",
    "Else": "flex-layout.row#default"
  }
}
```

### Condition grammar

In **`1.x.x`**, a simple grammar for creating conditions was provided. One could mix `subject`, `verb`, and `object` to construct their conditions in an idiomatic way. However, being a very simple grammar, conditions were very limited. For example, it was not possible to check for a specification property name **AND** its value.

```jsonc
{
  "condition.product": {
    "props": {
      "conditions": [
        // checks if the product has the
        // specification named `Material`
        {
          "subject": "specificationProperties",
          "verb": "contains",
          "object": "Material"
        }
      ]
    },
    "children": ["..."]
  }
}
```

In **`2.x.x`**, the aforementioned grammar was replaced with a pair of `subject` and `arguments`. This means that behind-the-scenes, a `subject` is linked to an internal method that receives the `arguments`. Make sure to check [what arguments each `subject` can receive in the docs](/docs/readme.md#condition-layoutcontext-props).

The above condition can be rewritten as:

```jsonc
{
  "condition.product": {
    "props": {
      "conditions": [
        // checks if the product has the
        // specification named `Material`
        {
          "subject": "specificationProperties",
          "arguments": {
            "name": "Material"
            // could also check for its value
            // "value": "Leather"
          }
        }
      ],
      "Then": "..."
    }
  }
}
```

### Negating conditions

In `1.x.x`, we had the negating verbs: `is-not` and `does-not-contain`.

```jsonc
{
  "condition.product": {
    "props": {
      "conditions": [
        {
          "subject": "specificationProperties",
          "verb": "does-not-contain",
          "object": "Material"
        }
      ]
    },
    "children": ["..."]
  }
}
```

In `2.x.x` we don't have `verb` anymore, so to negate any condition one can define the `toBe` property, which assigns the expected value of that condition.

The above condition can be rewritten as:

```json
{
  "condition.product": {
    "props": {
      "conditions": [
        {
          "subject": "specificationProperties",
          "arguments": {
            "name": "Material"
          },
          "toBe": false
        }
      ],
      "Then": "..."
    }
  }
}
```
