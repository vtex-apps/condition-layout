import React from 'react'
import { useProduct } from 'vtex.product-context'

import ConditionLayout from './ConditionLayout'

const SUBJECTS = {
  productId: {
    type: 'value',
  },
  categoryId: {
    type: 'value',
  },
  brandId: {
    type: 'value',
  },
  productClusters: {
    type: 'array',
    id: 'id',
  },
  categoryTree: {
    type: 'array',
    id: 'id',
  },
  selectedItemId: {
    type: 'value',
  },
} as const

const Product: StorefrontFunctionComponent = ({ children }) => {
  const { product, selectedItem } = useProduct() as any

  const values = {
    productId: product.productId,
    categoryId: product.categoryId,
    brandId: product.brandId,
    productClusters: product.productClusters,
    categoryTree: product.categoryTree,
    selectedItemId: selectedItem.itemId,
  }

  return (
    <ConditionLayout values={values} subjects={SUBJECTS}>
      {children}
    </ConditionLayout>
  )
}

Product.schema = {
  title: 'admin/editor.condition-layout.wrapper',
}

export default Product
