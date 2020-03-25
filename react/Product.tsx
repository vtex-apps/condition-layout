import React, { FC, useMemo } from 'react'
import { useProduct } from 'vtex.product-context'
import { testConditions } from './modules/conditions'
import pick from 'ramda/es/pick'

const SUBJECTS = { 
  productId: {
    type: 'value'
  },
  categoryId: {
    type: 'value'
  },
  brandId: {
    type: 'value'
  },
  productClusters: {
    type: 'array',
    id: 'id'
  },
  categoryTree: {
    type: 'array',
    id: 'id'
  },
  selectedItemId: {
    type: 'value'
  }
 } as const

type Subjects = typeof SUBJECTS

interface Props {
  conditions?: Conditions<Subjects>
  matching: Matching
}

const Product: FC<Props> = ({ children, conditions, matching = 'all' }) => {
  const { product , selectedItem} = useProduct()

  const values = {
    productId: product.productId,
    categoryId: product.categoryId,
    brandId: product.brandId,
    productClusters: product.productClusters,
    categoryTree: product.categoryTree,
    selectedItemId: selectedItem.itemId,
  }

  console.log({ values })

  if (!conditions) {
    // TODO: Handle error better
    console.warn('Missing conditions')
    return null
  }

  const matches = useMemo(() => {
    const { matches } = testConditions(
      SUBJECTS,
      conditions,
      matching,
      values
    )
    return matches
  }, [
    SUBJECTS,
    conditions,
    matching,
    values
  ])

  if (!matches) {
    return <div>nao deu match</div>
  }

  return <div className="ba b--red">oi{children}</div>
}

export default Product
