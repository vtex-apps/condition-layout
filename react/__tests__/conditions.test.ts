import {
  testCondition,
  validateConditions,
  testConditions,
} from '../modules/conditions'

const SUBJECTS = {
  productId: { type: 'value' },
  categoryId: { type: 'value' },
  brandId: { type: 'value' },
  productClusters: { type: 'array', id: 'id' },
  categoryTree: { type: 'array' },
  properties: { type: 'array', name: 'name' },
  customId: { type: 'array', id: 'identifier' },
  selectedItemId: { type: 'value' },
} as const

describe('single condition', () => {
  it('returns an array of valid and invalid conditions', () => {
    const result = validateConditions(SUBJECTS, [
      { subject: 'productId' },
      { subject: 'customId' },
      { subject: 'INVALID_THINGIE' },
      { subject: 'customId', verb: 'matchesMyThingie' },
    ])

    expect(result.valid).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ subject: 'productId' }),
        expect.objectContaining({ subject: 'customId' }),
      ])
    )

    expect(result.invalid).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ subject: 'INVALID_THINGIE' }),
        expect.objectContaining({
          subject: 'customId',
          verb: 'matchesMyThingie',
        }),
      ])
    )
  })

  it('returns true if value condition matches', () => {
    const result = testCondition({
      subjects: SUBJECTS,
      values: {
        productId: 'product-id-value',
      },
      condition: {
        subject: 'productId',
        verb: 'is',
        object: 'product-id-value',
      },
    })

    const negatedResult = testCondition({
      subjects: SUBJECTS,
      values: {
        productId: 'product-id-value',
      },
      condition: {
        subject: 'productId',
        verb: 'is-not',
        object: 'product-id-value',
      },
    })

    expect(result).toBe(true)
    expect(negatedResult).toBe(false)
  })

  it('returns false if value not found', () => {
    const result = testCondition({
      subjects: SUBJECTS,
      values: {},
      condition: {
        subject: 'potato',
        verb: 'is',
        object: 'product-id-value',
      },
    })

    expect(result).toBe(false)
  })

  it('returns true if array condition matches', () => {
    const result = testCondition({
      subjects: SUBJECTS,
      values: {
        productClusters: [{ id: 'id1' }, { id: 'id2' }, { id: 'id3' }],
      },
      condition: {
        subject: 'productClusters',
        verb: 'contains',
        object: 'id2',
      },
    })
    const negatedResult = testCondition({
      subjects: SUBJECTS,
      values: {
        productClusters: [{ id: 'id1' }, { id: 'id2' }, { id: 'id3' }],
      },
      condition: {
        subject: 'productClusters',
        verb: 'does-not-contain',
        object: 'id2',
      },
    })

    expect(result).toBe(true)
    expect(negatedResult).toBe(false)
  })

  it("defaults identifier prop to 'id'", () => {
    const result = testCondition({
      subjects: SUBJECTS,
      values: {
        categoryTree: [{ id: 'id1' }, { id: 'id2' }, { id: 'id3' }],
      },
      condition: {
        subject: 'categoryTree',
        verb: 'contains',
        object: 'id2',
      },
    })

    expect(result).toBe(true)
  })

  it("defaults identifier prop to 'name'", () => {
    const result = testCondition({
      subjects: SUBJECTS,
      values: {
        properties: [{ name: 'name1' }, { name: 'name2' }, { name: 'name3' }],
      },
      condition: {
        subject: 'properties',
        verb: 'contains',
        object: 'name2',
      },
    })

    expect(result).toBe(true)
  })

  it("supports custom identifier prop other than 'id'", () => {
    const result = testCondition({
      subjects: SUBJECTS,
      values: {
        customId: [
          { identifier: 'id1' },
          { identifier: 'id2' },
          { identifier: 'id3' },
        ],
      },
      condition: {
        subject: 'customId',
        verb: 'contains',
        object: 'id2',
      },
    })

    expect(result).toBe(true)
  })
})

describe('multiple conditions', () => {
  it('returns false if no conditions were passed', () => {
    const matches = testConditions({
      subjects: SUBJECTS,
      match: 'all',
      values: {
        productId: 'product-id-value',
        productClusters: [{ id: 'id1' }, { id: 'id2' }, { id: 'id3' }],
      },
      conditions: [],
    })
    expect(matches).toBe(false)
  })

  it('returns false if invalid match type found', () => {
    const matches = testConditions({
      subjects: SUBJECTS,
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      match: 'invalid-match-type',
      values: {
        productId: 'product-id-value',
        productClusters: [{ id: 'id1' }, { id: 'id2' }, { id: 'id3' }],
      },
      conditions: [
        {
          subject: 'productId',
          verb: 'is',
          object: 'product-id-value',
        },
      ],
    })
    expect(matches).toBe(false)
  })

  it('returns false if a invalid condition is found', () => {
    const matches = testConditions({
      subjects: SUBJECTS,
      values: {
        productId: 'product-id-value',
      },
      conditions: [
        {
          subject: 'productId',
          verb: 'is',
          object: 'product-id-value',
        },
        {
          subject: 'productId',
          verb: 'contains',
          object: 'product-id-value',
        },
      ],
    })
    expect(matches).toBe(false)
  })

  it('returns true if ALL conditions match (all)', () => {
    const matches = testConditions({
      subjects: SUBJECTS,
      match: 'all',
      values: {
        productId: 'product-id-value',
        productClusters: [{ id: 'id1' }, { id: 'id2' }, { id: 'id3' }],
      },
      conditions: [
        {
          subject: 'productId',
          verb: 'is',
          object: 'product-id-value',
        },
        {
          subject: 'productClusters',
          verb: 'contains',
          object: 'id2',
        },
      ],
    })
    expect(matches).toBe(true)
  })

  it('returns false if some condition does not match (all)', () => {
    const matches = testConditions({
      subjects: SUBJECTS,
      match: 'all',
      values: {
        productId: 'product-id-value',
        productClusters: [{ id: 'id1' }, { id: 'id2' }, { id: 'id3' }],
      },
      conditions: [
        {
          subject: 'productId',
          verb: 'is',
          object: 'wrong-value',
        },
        {
          subject: 'productClusters',
          verb: 'contains',
          object: 'id2',
        },
      ],
    })
    expect(matches).toBe(false)
  })

  it('returns true if at least one condition matches (any)', () => {
    const matches = testConditions({
      subjects: SUBJECTS,
      match: 'any',
      values: {
        productId: 'product-id-value',
        productClusters: [{ id: 'id1' }, { id: 'id2' }, { id: 'id3' }],
      },
      conditions: [
        {
          subject: 'productId',
          verb: 'is',
          object: 'wrong-value',
        },
        {
          subject: 'productClusters',
          verb: 'contains',
          object: 'id2',
        },
      ],
    })
    expect(matches).toBe(true)
  })

  it('returns true if NONE condition matches (none)', () => {
    const matches = testConditions({
      subjects: SUBJECTS,
      match: 'none',
      values: {
        productId: 'product-id-value',
        productClusters: [{ id: 'id1' }, { id: 'id2' }, { id: 'id3' }],
      },
      conditions: [
        {
          subject: 'productId',
          verb: 'is',
          object: 'wrong-value',
        },
        {
          subject: 'productClusters',
          verb: 'contains',
          object: 'non-existing',
        },
      ],
    })
    expect(matches).toBe(true)
  })

  it('returns false if any condition matches (none)', () => {
    const matches = testConditions({
      subjects: SUBJECTS,
      match: 'none',
      values: {
        productId: 'product-id-value',
        productClusters: [{ id: 'id1' }, { id: 'id2' }, { id: 'id3' }],
      },
      conditions: [
        {
          subject: 'productId',
          verb: 'is',
          object: 'product-id-value',
        },
        {
          subject: 'productClusters',
          verb: 'contains',
          object: 'non-existing',
        },
      ],
    })
    expect(matches).toBe(false)
  })
})
