import React, { useMemo } from 'react'
import { useProduct } from 'vtex.product-context'
import type { Product, Item } from 'vtex.product-context/react/ProductTypes'

import ConditionLayout from './ConditionLayout'
import type { NoUndefinedField, MatchType, Condition, Handlers } from './types'

type Props = {
  conditions: Array<Condition<SubjectValues, SubjectArgs>>
  matchType?: MatchType
  Else?: React.ComponentType
  Then?: React.ComponentType
}

type SubjectValues = {
  productId: Product['productId']
  categoryId: Product['categoryId']
  brandId: Product['brandId']
  productClusters: Product['productClusters']
  categoryTree: Product['categoryTree']
  selectedItemId: Item['itemId']
  specificationProperties: Product['properties']
  areAllVariationsSelected: boolean
  isProductAvailable: boolean
}

type SubjectArgs = {
  productId: { id: string }
  categoryId: { id: string }
  brandId: { id: string }
  productClusters: { id: string }
  categoryTree: { id: string }
  selectedItemId: { id: string }
  specificationProperties: { name: string; value?: string }
  areAllVariationsSelected: undefined
  isProductAvailable: boolean
}

export const HANDLERS: Handlers<SubjectValues, SubjectArgs> = {
  productId({ values, args }) {
    return String(values.productId) === String(args?.id)
  },
  categoryId({ values, args }) {
    return String(values.categoryId) === String(args?.id)
  },
  brandId({ values, args }) {
    return String(values.brandId) === String(args?.id)
  },
  selectedItemId({ values, args }) {
    return String(values.selectedItemId) === String(args?.id)
  },
  areAllVariationsSelected({ values }) {
    return values.areAllVariationsSelected
  },
  productClusters({ values, args }) {
    return Boolean(
      values.productClusters.find(({ id }) => String(id) === String(args?.id))
    )
  },
  categoryTree({ values, args }) {
    return Boolean(
      values.categoryTree.find(({ id }) => String(id) === String(args?.id))
    )
  },
  specificationProperties({ values, args }) {
    const specification = values.specificationProperties.find(
      ({ name }) => name === args?.name
    )

    if (specification == null) return false
    if (args?.value == null) return Boolean(specification)

    return specification.values.includes(String(args?.value))
  },
  isProductAvailable({ values }) {
    return values.isProductAvailable
  },
}

const ConditionLayoutProduct: StorefrontFunctionComponent<Props> = ({
  Else,
  Then,
  matchType,
  conditions,
  children,
}) => {
  const {
    product,
    selectedItem,
    skuSelector: { areAllVariationsSelected = false } = {},
  } = useProduct() ?? {}

  const {
    productId,
    categoryId,
    brandId,
    productClusters,
    categoryTree,
    properties: specificationProperties,
  } = product ?? {}

  const { itemId: selectedItemId, sellers } = selectedItem ?? {}
  const sellersWithProductAvailable = sellers?.filter(
    (seller) => seller.commertialOffer.AvailableQuantity > 0
  )

  const isProductAvailable =
    !!sellersWithProductAvailable && sellersWithProductAvailable.length > 0

  // We use a useMemo to modify the condition layout "values"
  // only when some of the context props change.
  const values = useMemo(() => {
    const bag = {
      productId,
      categoryId,
      brandId,
      productClusters,
      categoryTree,
      selectedItemId,
      specificationProperties,
      areAllVariationsSelected,
      isProductAvailable,
    }

    // We use `NoUndefinedField` to remove optionality + undefined values from the type
    return bag as NoUndefinedField<typeof bag>
  }, [
    brandId,
    categoryId,
    categoryTree,
    productClusters,
    productId,
    selectedItemId,
    specificationProperties,
    areAllVariationsSelected,
    isProductAvailable,
  ])

  // Sometimes it takes a while for useProduct() to return the correct results
  if (values.selectedItemId == null || values.productId == null) {
    return null
  }

  return (
    <ConditionLayout
      Else={Else}
      Then={Then}
      matchType={matchType}
      conditions={conditions}
      values={values}
      handlers={HANDLERS}
    >
      {children}
    </ConditionLayout>
  )
}

ConditionLayoutProduct.schema = {
  title: 'admin/editor.condition-layout.wrapper.product',
}

export default ConditionLayoutProduct
