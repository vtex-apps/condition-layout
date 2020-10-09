/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { render } from '@vtex/test-tools/react'
import { useProduct } from 'vtex.product-context'
import type { ProductContextState } from 'vtex.product-context/react/ProductContextProvider'

import ConditionLayout from './ConditionLayout'

const mockedUseProduct = useProduct as jest.Mock<ProductContextState>

function getMockedProduct({
  skuId = '37',
  productId = 'prod-id',
  categoryId = 'cat-id',
  brandId = 'brand-id',
  areAllVariationsSelected = false,
} = {}): ProductContextState {
  return ({
    product: {
      productId,
      categoryId,
      brandId,
      productClusters: [{ id: 'cluster1', name: 'cluster 1' }],
      categoryTree: [{ id: 'cat1', name: 'cat 1', href: '' }],
      properties: [{ name: 'prop 1', values: 'value' }],
    },
    selectedItem: {
      itemId: skuId,
    },
    skuSelector: {
      areAllVariationsSelected,
    },
  } as any) as ProductContextState
}

test('Renders a condition that resolves to true', () => {
  mockedUseProduct.mockImplementation(() => getMockedProduct())

  const { queryByText } = render(
    <ConditionLayout
      conditions={[
        {
          subject: 'selectedItemId',
          arguments: { id: '37' },
        },
      ]}
      handlers={{
        selectedItemId: ({ args }: any) => args.id === '37',
      }}
      values={{}}
    >
      Hooray!
    </ConditionLayout>
  )

  expect(queryByText(/Hooray!/)).toBeInTheDocument()
})
