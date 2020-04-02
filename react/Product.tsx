import { FC, useMemo } from 'react'
import { useProduct } from 'vtex.product-context'
// import pick from 'ramda/es/pick'

import { testConditions } from './modules/conditions'

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

type Subjects = typeof SUBJECTS

interface Props {
  conditions?: Conditions<Subjects>
  matching: Matching
}

const Product: FC<Props> = ({ children, conditions, matching = 'all' }) => {
  const { product, selectedItem } = useProduct() as any

  const values = {
    productId: product.productId,
    categoryId: product.categoryId,
    brandId: product.brandId,
    productClusters: product.productClusters,
    categoryTree: product.categoryTree,
    selectedItemId: selectedItem.itemId,
  }

  const matches = useMemo(() => {
    if (!conditions) return null

    // eslint-disable-next-line no-shadow
    const { matches } = testConditions({
      availableSubjects: SUBJECTS,
      conditions,
      matching,
      values,
    })
    return matches
  }, [conditions, matching, values])

  if (!conditions) {
    // TODO: Handle error better
    console.warn('Missing conditions')
    return null
  }

  if (!matches) {
    return null
  }

  return (children as any) ?? null
}

export default Product
