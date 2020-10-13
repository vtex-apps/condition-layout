/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { render } from '@vtex/test-tools/react'
import { useProduct } from 'vtex.product-context'
import type { ProductContextState } from 'vtex.product-context/react/ProductContextProvider'

import ConditionLayoutProduct from './ConditionLayoutProduct'

const mockedUseProduct = useProduct as jest.Mock<ProductContextState>

function getMockedProduct({
  skuId = '37',
  productId = 'prod-id',
  categoryId = 'cat-id',
  brandId = 'brand-id',
  clusterId = 'cluster1',
  catTreeId = 'cat1',
  propName = 'prop1',
  propValue = 'value1',
  areAllVariationsSelected = false,
} = {}): ProductContextState {
  return ({
    product: {
      productId,
      categoryId,
      brandId,
      productClusters: [{ id: clusterId, name: 'cluster 1' }],
      categoryTree: [{ id: catTreeId, name: 'cat 1', href: '' }],
      properties: [{ name: propName, values: propValue }],
    },
    selectedItem: { itemId: skuId },
    skuSelector: { areAllVariationsSelected },
  } as any) as ProductContextState
}

test('renders nothing if no product context is available', () => {
  mockedUseProduct.mockImplementation(() => undefined as any)

  const { container } = render(
    <ConditionLayoutProduct
      conditions={[{ subject: 'selectedItemId', arguments: { id: '37' } }]}
    >
      Hooray!
    </ConditionLayoutProduct>
  )

  expect(container).toBeEmptyDOMElement()
})

describe('subject: selectedItemId', () => {
  it('Renders a condition that resolves to true', () => {
    mockedUseProduct.mockImplementation(() => getMockedProduct({ skuId: '37' }))

    const { queryByText } = render(
      <ConditionLayoutProduct
        conditions={[{ subject: 'selectedItemId', arguments: { id: '37' } }]}
      >
        Hooray!
      </ConditionLayoutProduct>
    )

    expect(queryByText(/Hooray!/)).toBeInTheDocument()
  })

  it('Renders the Then slot of a condition that resolves to true', () => {
    const thenSlot = () => <>Hooray!</>

    mockedUseProduct.mockImplementation(() => getMockedProduct({ skuId: '37' }))

    const { queryByText } = render(
      <ConditionLayoutProduct
        conditions={[{ subject: 'selectedItemId', arguments: { id: '37' } }]}
        Then={thenSlot}
      />
    )

    expect(queryByText(/Hooray!/)).toBeInTheDocument()
  })

  it('Renders the Else slot of a condition that resolves to false', () => {
    mockedUseProduct.mockImplementation(() => getMockedProduct({ skuId: '37' }))

    const ElseComponent = () => <>Nope</>

    const { queryByText } = render(
      <ConditionLayoutProduct
        conditions={[{ subject: 'selectedItemId', arguments: { id: '39' } }]}
        Else={ElseComponent}
      >
        Hooray!
      </ConditionLayoutProduct>
    )

    expect(queryByText(/Hooray!/)).not.toBeInTheDocument()
    expect(queryByText(/Nope/)).toBeInTheDocument()
  })
})

describe('subject: productId', () => {
  it('Renders a condition that resolves to true', () => {
    mockedUseProduct.mockImplementation(() =>
      getMockedProduct({ productId: 'prod-2' })
    )

    const { queryByText } = render(
      <ConditionLayoutProduct
        conditions={[{ subject: 'productId', arguments: { id: 'prod-2' } }]}
      >
        Hooray!
      </ConditionLayoutProduct>
    )

    expect(queryByText(/Hooray!/)).toBeInTheDocument()
  })
})

describe('subject: categoryId', () => {
  it('Renders a condition that resolves to true', () => {
    mockedUseProduct.mockImplementation(() =>
      getMockedProduct({ categoryId: 'cat-2' })
    )

    const { queryByText } = render(
      <ConditionLayoutProduct
        conditions={[{ subject: 'categoryId', arguments: { id: 'cat-2' } }]}
      >
        Hooray!
      </ConditionLayoutProduct>
    )

    expect(queryByText(/Hooray!/)).toBeInTheDocument()
  })
})

describe('subject: brandId', () => {
  it('Renders a condition that resolves to true', () => {
    mockedUseProduct.mockImplementation(() =>
      getMockedProduct({ brandId: 'brand-2' })
    )

    const { queryByText } = render(
      <ConditionLayoutProduct
        conditions={[{ subject: 'brandId', arguments: { id: 'brand-2' } }]}
      >
        Hooray!
      </ConditionLayoutProduct>
    )

    expect(queryByText(/Hooray!/)).toBeInTheDocument()
  })
})

describe('subject: productClusters', () => {
  it('Renders a condition that resolves to true', () => {
    mockedUseProduct.mockImplementation(() =>
      getMockedProduct({ clusterId: 'cluster-1' })
    )

    const { queryByText } = render(
      <ConditionLayoutProduct
        conditions={[
          { subject: 'productClusters', arguments: { id: 'cluster-1' } },
        ]}
      >
        Hooray!
      </ConditionLayoutProduct>
    )

    expect(queryByText(/Hooray!/)).toBeInTheDocument()
  })
})

describe('subject: category tree', () => {
  it('Renders a condition that resolves to true', () => {
    mockedUseProduct.mockImplementation(() =>
      getMockedProduct({ catTreeId: 'cat-1' })
    )

    const { queryByText } = render(
      <ConditionLayoutProduct
        conditions={[{ subject: 'categoryTree', arguments: { id: 'cat-1' } }]}
      >
        Hooray!
      </ConditionLayoutProduct>
    )

    expect(queryByText(/Hooray!/)).toBeInTheDocument()
  })
})

describe('subject: specification properties', () => {
  it('renders a true condition with just the name', () => {
    mockedUseProduct.mockImplementation(() =>
      getMockedProduct({ propName: 'prop-1' })
    )

    const { queryByText } = render(
      <ConditionLayoutProduct
        conditions={[
          { subject: 'specificationProperties', arguments: { name: 'prop-1' } },
        ]}
      >
        Hooray!
      </ConditionLayoutProduct>
    )

    expect(queryByText(/Hooray!/)).toBeInTheDocument()
  })

  it("doesn't render when specification doesn't exist", () => {
    mockedUseProduct.mockImplementation(() =>
      getMockedProduct({ propName: 'prop-1' })
    )

    const { queryByText } = render(
      <ConditionLayoutProduct
        conditions={[
          {
            subject: 'specificationProperties',
            arguments: { name: 'non-existing' },
          },
        ]}
      >
        Hooray!
      </ConditionLayoutProduct>
    )

    expect(queryByText(/Hooray!/)).not.toBeInTheDocument()
  })

  it('renders a true condition with name and value', () => {
    mockedUseProduct.mockImplementation(() =>
      getMockedProduct({ propName: 'prop-2', propValue: 'potato' })
    )

    const { queryByText } = render(
      <ConditionLayoutProduct
        conditions={[
          {
            subject: 'specificationProperties',
            arguments: { name: 'prop-2', value: 'potato' },
          },
        ]}
      >
        Hooray!
      </ConditionLayoutProduct>
    )

    expect(queryByText(/Hooray!/)).toBeInTheDocument()
  })

  it("doens't render when value doesn't exist", () => {
    mockedUseProduct.mockImplementation(() =>
      getMockedProduct({ propName: 'prop-2', propValue: 'potato' })
    )

    const { queryByText } = render(
      <ConditionLayoutProduct
        conditions={[
          {
            subject: 'specificationProperties',
            arguments: { name: 'prop-2', value: 'ice-cream' },
          },
        ]}
      >
        Hooray!
      </ConditionLayoutProduct>
    )

    expect(queryByText(/Hooray!/)).not.toBeInTheDocument()
  })
})

describe('subject: areAllVariationsSelected', () => {
  it('renders a true condition with name and value', () => {
    const ui = (
      <ConditionLayoutProduct
        conditions={[{ subject: 'areAllVariationsSelected' }]}
      >
        Hooray!
      </ConditionLayoutProduct>
    )

    mockedUseProduct.mockImplementation(() =>
      getMockedProduct({ areAllVariationsSelected: false })
    )

    const { queryByText, rerender } = render(ui)

    expect(queryByText(/Hooray!/)).not.toBeInTheDocument()

    mockedUseProduct.mockImplementation(() =>
      getMockedProduct({ areAllVariationsSelected: true })
    )

    rerender(ui)

    expect(queryByText(/Hooray!/)).toBeInTheDocument()
  })
})
