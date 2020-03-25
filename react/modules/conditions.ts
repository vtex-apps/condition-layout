const isValueCondition = <T extends GenericSubjects>(
  subjects: T,
  condition: Condition<T>
): condition is ValueCondition<T> =>
  subjects[condition.subject]?.type === 'value'

const isArrayCondition = <T extends GenericSubjects>(
  subjects: T,
  condition: Condition<T>
): condition is ArrayCondition<T> =>
  subjects[condition.subject]?.type === 'array'

const validateConditions = <T>(
  availableSubjects: T,
  conditions: Conditions<T>
) => conditions.every(condition => condition.subject in availableSubjects)

const testValueCondition = <T extends GenericSubjects>(values: any, condition: ValueCondition<T>) => {
  const value = values[condition.subject]
  const matches = String(value) === String(condition.object)
  // TODO: error messages on wrong verbs
  return (condition.verb === 'is' || !condition.verb) === matches
}

const testArrayCondition = <T extends GenericSubjects>(values: Values<T>, condition: ArrayCondition<T>) => {
  // TODO prevent potential errors here w invalid subject
  type A = typeof values['productClusters']
  const ids = values[condition.subject].map((item: any) => String(item.id))
  const matches = ids.includes(String(condition.object))
  // TODO: error messages on wrong verbs
  return (condition.verb === 'contains' || !condition.verb) === matches
}

const testCondition = <T extends GenericSubjects>(
  availableSubjects: T,
  values: any,
  condition: Condition<T>
) => {
  if (isValueCondition(availableSubjects, condition)) {
    testValueCondition(values, condition)
  }

  if (isArrayCondition(availableSubjects, condition)) {
    testArrayCondition(values, condition)
  }

  // TODO add error
  return false
}

export const testConditions = <T extends GenericSubjects>(
  availableSubjects: T,
  conditions: Conditions<T>,
  matching: Matching,
  values: any
) => {
  // TODO: validate conditions

  const results = conditions.map(condition =>
    testCondition(availableSubjects, values, condition)
  )

  let matches = results.reduce((acc: boolean | null, condition) => {
    if (matching === 'all') {
      return (acc ?? true) && condition
    }
    if (matching === 'any') {
      return (acc ?? false) || condition
    }
    if (matching === 'none') {
      return (acc ?? true) && !condition
    }
    return null
  }, null)

  if (matches == null) {
    matches = false
    // TODO: Add error
  }

  return { matches }
}
