import React from 'react'
import { useProduct } from 'vtex.product-context'

import ConditionLayout from './ConditionLayout'
import { PRODUCT_SUBJECTS } from './modules/subjects'

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
    <ConditionLayout values={values} subjects={PRODUCT_SUBJECTS}>
      {children}
    </ConditionLayout>
  )
}

Product.schema = {
  title: 'admin/editor.condition-layout.wrapper.product',
}

export default Product
