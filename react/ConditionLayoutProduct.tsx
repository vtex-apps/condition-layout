import React from 'react'
import { useProduct } from 'vtex.product-context'

import ConditionLayout from './ConditionLayout'

export const PRODUCT_SUBJECTS = {
  productId: {
    type: 'value',
  },
  categoryId: {
    type: 'value',
  },
  brandId: {
    type: 'value',
  },
  selectedItemId: {
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
} as const

const Product: StorefrontFunctionComponent = ({ children }) => {
  const { product, selectedItem } = useProduct() as any

  // Sometimes it takes a while for useProduct() to return the correct results
  if ( product == null || selectedItem == null) return null

  const values = {
    productId: product.productId,
    categoryId: product.categoryId,
    brandId: product.brandId,
    productClusters: product.productClusters,
    categoryTree: product.categoryTree,
    selectedItemId: selectedItem.itemId,
  }

  return (
    <ConditionLayout values={values} subjects={PRODUCT_SUBJECTS}>
      {children}
    </ConditionLayout>
  )
}

Product.schema = {
  title: 'admin/editor.condition-layout.wrapper.product',
}

export default Product
