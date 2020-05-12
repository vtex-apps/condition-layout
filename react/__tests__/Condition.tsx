import * as React from 'react'
import { useProduct } from 'vtex.product-context'
import { render } from '@vtex/test-tools/react'

import ConditionLayout from '../ConditionLayoutProduct'
import ConditionProduct from '../ConditionProduct'
import ConditionElse from '../ConditionElse'

type ProductContext = {
  product: {
    productId: string
    categoryId: string
    brandId: string
    productClusters: string[]
    categoryTree: string[]
    specificationGroups: string[]
  }
  selectedItem: {
    itemId: string
  }
}

const mockedUseProduct = useProduct as jest.Mock<ProductContext>

function getMockedProduct({ skuId = '37' }) {
  return {
    product: {
      productId: 'productId',
      categoryId: 'categoryId',
      brandId: 'brandId',
      productClusters: ['productClusters'],
      categoryTree: ['categoryTree'],
      specificationGroups: ['specificationGroups'],
    },
    selectedItem: {
      itemId: skuId,
    },
  }
}

test('Renders a condition that resolves to true', () => {
  mockedUseProduct.mockImplementation(() => getMockedProduct({ skuId: '37' }))

  const { queryByText } = render(
    <ConditionLayout>
      <ConditionProduct
        conditions={[
          {
            subject: 'selectedItemId',
            verb: 'is',
            object: '37',
          },
        ]}
      >
        Hooray!
      </ConditionProduct>
    </ConditionLayout>
  )

  expect(queryByText(/Hooray!/)).toBeTruthy()
})

test('Renders the else block if no condition match', () => {
  mockedUseProduct.mockImplementation(() => getMockedProduct({ skuId: '37' }))

  const { queryByText } = render(
    <ConditionLayout>
      <ConditionProduct
        conditions={[
          {
            subject: 'selectedItemId',
            verb: 'is',
            object: 'foo',
          },
        ]}
      >
        Hooray!
      </ConditionProduct>
      <ConditionElse>Oh no!</ConditionElse>
    </ConditionLayout>
  )

  expect(queryByText(/Hooray!/)).toBeFalsy()
  expect(queryByText(/Oh no!/)).toBeTruthy()
})

test("Doesn't render the else block if some condition match", () => {
  mockedUseProduct.mockImplementation(() => getMockedProduct({ skuId: '37' }))

  const { queryByText } = render(
    <ConditionLayout>
      <ConditionProduct
        conditions={[
          {
            subject: 'selectedItemId',
            verb: 'is',
            object: '37',
          },
        ]}
      >
        Hooray!
      </ConditionProduct>
      <ConditionElse>Oh no!</ConditionElse>
    </ConditionLayout>
  )

  expect(queryByText(/Hooray!/)).toBeTruthy()
  expect(queryByText(/Oh no!/)).toBeFalsy()
})

test('Switches from rendering a matched condition to the else component', () => {
  mockedUseProduct.mockImplementation(() => getMockedProduct({ skuId: '37' }))

  const layout = (
    <ConditionLayout>
      <ConditionProduct
        conditions={[
          {
            subject: 'selectedItemId',
            verb: 'is',
            object: '37',
          },
        ]}
      >
        Hooray!
      </ConditionProduct>
      <ConditionElse>Oh no!</ConditionElse>
    </ConditionLayout>
  )

  const { queryByText, rerender } = render(layout)

  expect(queryByText(/Hooray!/)).toBeTruthy()
  expect(queryByText(/Oh no!/)).toBeFalsy()

  mockedUseProduct.mockImplementation(() => ({
    product: {
      productId: 'productId',
      categoryId: 'categoryId',
      brandId: 'brandId',
      productClusters: ['productClusters'],
      categoryTree: ['categoryTree'],
      specificationGroups: ['specificationGroups'],
    },
    selectedItem: {
      itemId: '370',
    },
  }))

  rerender(layout)

  expect(queryByText(/Hooray!/)).toBeFalsy()
  expect(queryByText(/Oh no!/)).toBeTruthy()
})

test('Switches from rendering the else component to a matched condition component', () => {
  mockedUseProduct.mockImplementation(() => getMockedProduct({ skuId: '37' }))

  const layout = (
    <ConditionLayout>
      <ConditionProduct
        conditions={[
          {
            subject: 'selectedItemId',
            verb: 'is',
            object: '370',
          },
        ]}
      >
        Hooray!
      </ConditionProduct>
      <ConditionElse>Oh no!</ConditionElse>
    </ConditionLayout>
  )

  const { queryByText, rerender } = render(layout)

  expect(queryByText(/Hooray!/)).toBeFalsy()
  expect(queryByText(/Oh no!/)).toBeTruthy()

  mockedUseProduct.mockImplementation(() => getMockedProduct({ skuId: '370' }))

  rerender(layout)

  expect(queryByText(/Hooray!/)).toBeTruthy()
  expect(queryByText(/Oh no!/)).toBeFalsy()
})
