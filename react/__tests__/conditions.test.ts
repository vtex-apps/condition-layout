import { testCondition, validateConditions } from '../modules/conditions'

const SUBJECTS = {
  productId: { type: 'value' },
  categoryId: { type: 'value' },
  brandId: { type: 'value' },
  productClusters: { type: 'array', id: 'id' },
  categoryTree: { type: 'array', id: 'id' },
  customId: { type: 'array', id: 'identifier' },
  selectedItemId: { type: 'value' },
} as const

describe('validate condition', () => {
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
})

describe('test condition', () => {
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
        subject: 'potato' as never,
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
        subject: 'productClusters' as never,
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
        subject: 'productClusters' as never,
        verb: 'does-not-contain',
        object: 'id2',
      },
    })

    expect(result).toBe(true)
    expect(negatedResult).toBe(false)
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
        subject: 'customId' as never,
        verb: 'contains',
        object: 'id2',
      },
    })

    expect(result).toBe(true)
  })
})
