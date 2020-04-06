import React, { FC } from 'react'
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
    <ConditionLayout values={values} subjects={SUBJECTS}>
      {children}
    </ConditionLayout>
  )
}

export default Product
