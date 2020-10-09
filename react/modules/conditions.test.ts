// export function validateConditions({
//   matchType,
//   conditions,
//   values,
//   handlers,
// }: {
//   matchType: MatchType
//   conditions: Condition[]
//   values: Record<string, unknown>
//   handlers: Record<string, unknown>
// }) {

import { validateConditions } from './conditions'
import { Condition } from '../types'

const handlers = {
  potatoId({ values, args }: unknown) {
    return values.potatoId === args.potatoId
  },
  kiwiId({ values, args }: unknown) {
    return values.kiwiId === args.kiwiId
  },
}

describe('matchType: all', () => {
  it('returns true for a simple condition', () => {
    const conditions = [
      {
        subject: 'potatoId',
        arguments: {
          potatoId: 'correct',
        },
      },
    ]

    const values = {
      potatoId: 'correct',
    }

    const result = validateConditions({
      conditions,
      values,
      handlers,
    })

    expect(result).toBe(true)
  })

  it('returns false for a simple condition', () => {
    const conditions = [
      {
        subject: 'potatoId',
        arguments: {
          potatoId: 'wrong',
        },
      },
    ]

    const values = {
      potatoId: 'correct',
    }

    const result = validateConditions({
      conditions,
      values,
      handlers,
    })

    expect(result).toBe(false)
  })

  it('returns true for a composed condition', () => {
    const conditions: Condition[] = [
      {
        subject: 'potatoId',
        arguments: {
          potatoId: 'correct',
        },
      },
      {
        subject: 'kiwiId',
        arguments: {
          kiwiId: 'correct',
        },
      },
    ]

    const values = {
      potatoId: 'correct',
      kiwiId: 'correct',
    }

    const result = validateConditions({
      conditions,
      values,
      handlers,
    })

    expect(result).toBe(true)
  })

  it('returns false for a composed condition', () => {
    const conditions: Condition[] = [
      {
        subject: 'potatoId',
        arguments: {
          potatoId: 'correct',
        },
      },
      {
        subject: 'kiwiId',
        arguments: {
          kiwiId: 'wrong',
        },
      },
    ]

    const values = {
      potatoId: 'correct',
      kiwiId: 'correct',
    }

    const result = validateConditions({
      conditions,
      values,
      handlers,
    })

    expect(result).toBe(false)
  })
})

describe('matchType: any', () => {
  // simple 'any' conditions are the same as 'all' conditions

  it('returns true for a composed condition', () => {
    const conditions: Condition[] = [
      {
        subject: 'potatoId',
        arguments: {
          potatoId: 'wrong',
        },
      },
      {
        subject: 'kiwiId',
        arguments: {
          kiwiId: 'correct',
        },
      },
    ]

    const values = {
      potatoId: 'correct',
      kiwiId: 'correct',
    }

    const result = validateConditions({
      matchType: 'any',
      conditions,
      values,
      handlers,
    })

    expect(result).toBe(true)
  })

  it('returns false for a composed condition', () => {
    const conditions: Condition[] = [
      {
        subject: 'potatoId',
        arguments: {
          potatoId: 'wrong',
        },
      },
      {
        subject: 'kiwiId',
        arguments: {
          kiwiId: 'wrong',
        },
      },
    ]

    const values = {
      potatoId: 'correct',
      kiwiId: 'correct',
    }

    const result = validateConditions({
      conditions,
      values,
      handlers,
    })

    expect(result).toBe(false)
  })
})

describe('matchType: none', () => {
  it('returns true for a simple condition', () => {
    const conditions = [
      {
        subject: 'potatoId',
        arguments: {
          potatoId: 'wrong',
        },
      },
    ]

    const values = {
      potatoId: 'correct',
    }

    const result = validateConditions({
      matchType: 'none',
      conditions,
      values,
      handlers,
    })

    expect(result).toBe(true)
  })

  it('returns false for a simple condition', () => {
    const conditions = [
      {
        subject: 'potatoId',
        arguments: {
          potatoId: 'correct',
        },
      },
    ]

    const values = {
      potatoId: 'correct',
    }

    const result = validateConditions({
      matchType: 'none',
      conditions,
      values,
      handlers,
    })

    expect(result).toBe(false)
  })

  it('returns true for a composed condition', () => {
    const conditions: Condition[] = [
      {
        subject: 'potatoId',
        arguments: {
          potatoId: 'wrong',
        },
      },
      {
        subject: 'kiwiId',
        arguments: {
          kiwiId: 'wrong',
        },
      },
    ]

    const values = {
      potatoId: 'correct',
      kiwiId: 'correct',
    }

    const result = validateConditions({
      matchType: 'none',
      conditions,
      values,
      handlers,
    })

    expect(result).toBe(true)
  })

  it('returns false for a composed condition', () => {
    const conditions: Condition[] = [
      {
        subject: 'potatoId',
        arguments: {
          potatoId: 'wrong',
        },
      },
      {
        subject: 'kiwiId',
        arguments: {
          kiwiId: 'correct',
        },
      },
    ]

    const values = {
      potatoId: 'correct',
      kiwiId: 'correct',
    }

    const result = validateConditions({
      matchType: 'none',
      conditions,
      values,
      handlers,
    })

    expect(result).toBe(false)
  })
})
