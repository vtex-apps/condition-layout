/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { render } from '@vtex/test-tools/react'

import ConditionLayout from './ConditionLayout'

test('Renders a condition that resolves to true', () => {
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

test('Renders the Then slot if a condition resolves to true', () => {
  const ThenSlot = () => <>Hooray!</>

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
      Then={ThenSlot}
    />
  )

  expect(queryByText(/Hooray!/)).toBeInTheDocument()
})

test('Prevents children from being rendered if Then is set', () => {
  const ThenSlot = () => <>Hooray!</>

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
      Then={ThenSlot}
    >
      Potato!!
    </ConditionLayout>
  )

  expect(queryByText(/Hooray!/)).toBeInTheDocument()
  expect(queryByText(/Potato/)).not.toBeInTheDocument()
})

test('Renders nothing if no condition matches', () => {
  const { container } = render(
    <ConditionLayout
      conditions={[
        {
          subject: 'selectedItemId',
          arguments: { id: '39' },
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

  expect(container).toBeEmptyDOMElement()
})

test('Renders the else Slot if no condition matches', () => {
  const ElseSlot = () => <>Oh no!</>

  const { queryByText } = render(
    <ConditionLayout
      conditions={[
        {
          subject: 'selectedItemId',
          arguments: { id: '39' },
        },
      ]}
      handlers={{
        selectedItemId: ({ args }: any) => args.id === '37',
      }}
      values={{}}
      Else={ElseSlot}
    >
      Hooray!
    </ConditionLayout>
  )

  expect(queryByText(/Hooray!/)).not.toBeInTheDocument()
  expect(queryByText(/Oh no!/)).toBeInTheDocument()
})

test("Doesn't render the else block if some condition match", () => {
  const ElseSlot = () => <>Oh no!</>

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
      Else={ElseSlot}
    >
      Hooray!
    </ConditionLayout>
  )

  expect(queryByText(/Hooray!/)).toBeInTheDocument()
  expect(queryByText(/Oh no!/)).not.toBeInTheDocument()
})

test('Switches from rendering a matched condition to the else component', () => {
  const ElseSlot = () => <>Oh no!</>

  let id = '37'

  const layout = (
    <ConditionLayout
      conditions={[
        {
          subject: 'selectedItemId',
          arguments: { id: '37' },
        },
      ]}
      handlers={{
        selectedItemId: ({ args }: any) => args.id === id,
      }}
      values={{}}
      Else={ElseSlot}
    >
      Hooray!
    </ConditionLayout>
  )

  const { queryByText, rerender } = render(layout)

  expect(queryByText(/Hooray!/)).toBeInTheDocument()
  expect(queryByText(/Oh no!/)).not.toBeInTheDocument()

  // wrong id
  id = '38'

  rerender(layout)

  expect(queryByText(/Hooray!/)).not.toBeInTheDocument()
  expect(queryByText(/Oh no!/)).toBeInTheDocument()
})

test('Switches from rendering the else component to a matched condition component', () => {
  const ElseSlot = () => <>Oh no!</>

  // wrong id
  let id = '38'

  const layout = (
    <ConditionLayout
      conditions={[
        {
          subject: 'selectedItemId',
          arguments: { id: '37' },
        },
      ]}
      handlers={{
        selectedItemId: ({ args }: any) => args.id === id,
      }}
      values={{}}
      Else={ElseSlot}
    >
      Hooray!
    </ConditionLayout>
  )

  const { queryByText, rerender } = render(layout)

  expect(queryByText(/Hooray!/)).not.toBeInTheDocument()
  expect(queryByText(/Oh no!/)).toBeInTheDocument()

  // correct id
  id = '37'

  rerender(layout)
  expect(queryByText(/Hooray!/)).toBeInTheDocument()
  expect(queryByText(/Oh no!/)).not.toBeInTheDocument()
})
