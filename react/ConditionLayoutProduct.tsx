import React, { useMemo } from 'react'
import { useProduct } from 'vtex.product-context'

import ConditionLayout from './ConditionLayout'
import type { NoUndefinedField, MatchType, Condition } from './types'

type Props = {
  matchType: MatchType
  conditions: Condition[]
  Else?: React.ComponentType
  Then?: React.ComponentType
}

type SubjectBag = {
  productId: string
  categoryId: string
  brandId: string
  productClusters: Array<{ id: string }>
  categoryTree: Array<{ id: string }>
  selectedItemId: string
  // todo: fix the type of `values``` after fixing in product-context
  specificationProperties: Array<{ name: string; values: string }>
  areAllVariationsSelected: boolean
}

export const HANDLERS = {
  productId({
    values,
    args,
  }: {
    values: SubjectBag
    args: { productId: string }
  }) {
    return String(values.productId) === String(args?.productId)
  },
  categoryId({
    values,
    args,
  }: {
    values: SubjectBag
    args: {
      categoryId: string
    }
  }) {
    return String(values.categoryId) === String(args?.categoryId)
  },
  brandId({
    values,
    args,
  }: {
    values: SubjectBag
    args: {
      brandId: string
    }
  }) {
    return String(values.brandId) === String(args?.brandId)
  },
  selectedItemId({
    values,
    args,
  }: {
    values: SubjectBag
    args: { selectedItemId: string }
  }) {
    return String(values.selectedItemId) === String(args?.selectedItemId)
  },
  areAllVariationsSelected({ values }: { values: SubjectBag }) {
    return values.areAllVariationsSelected
  },
  productClusters({
    values,
    args,
  }: {
    values: SubjectBag
    args: { id: string }
  }) {
    return Boolean(
      values.productClusters.find(({ id }) => String(id) === String(args?.id))
    )
  },
  categoryTree({ values, args }: { values: SubjectBag; args: { id: string } }) {
    return Boolean(
      values.categoryTree.find(({ id }) => String(id) === String(args?.id))
    )
  },
  specificationProperties({
    values,
    args,
  }: {
    values: SubjectBag
    args: { name: string; value?: string }
  }) {
    const specification = values.specificationProperties.find(
      ({ name }) => name === args?.name
    )

    if (specification == null) return false
    if (args?.value == null) return Boolean(specification)

    return specification.values.includes(String(args?.value))
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

  const { itemId: selectedItemId } = selectedItem ?? {}

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
