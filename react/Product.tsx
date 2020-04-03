import React, { FC } from 'react'
import { useProduct } from 'vtex.product-context'

import { ConditionContext } from './ConditionContext'

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

export type ProductSubjects = typeof SUBJECTS

const Product: FC = ({ children }) => {
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
    <ConditionContext.Provider value={{ values, subjects: SUBJECTS }}>
      {children}
    </ConditionContext.Provider>
  )
}

export default Product
