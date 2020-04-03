const VERB_OPERATORS: Record<string, Record<string, 1>> = {
  value: {
    is: 1,
    'is-not': 1,
  },
  array: {
    contains: 1,
    'does-not-contain': 1,
  },
}

const isValueCondition = (subject: GenericSubject): subject is ValueSubject =>
  subject?.type === 'value'

const isArrayCondition = (subject: GenericSubject): subject is ArraySubject =>
  subject?.type === 'array'

const testValueCondition = (
  values: Record<string, string | number>,
  condition: ValueCondition
) => {
  const value = values[condition.subject]
  const matches = String(value) === String(condition.object)

  // TODO: error messages on wrong verbs
  return (condition.verb === 'is' || !condition.verb) === matches
}

const testArrayCondition = (
  subject: ArraySubject,
  values: Record<string, any[]>,
  condition: ArrayCondition
) => {
  // TODO: prevent potential errors here w invalid subject

  const subjectId = subject.id ?? 'id'
  const ids = values[condition.subject].map(item => String(item[subjectId]))
  const matches = ids.includes(String(condition.object))

  // TODO: error messages on wrong verbs
  return (condition.verb === 'contains' || !condition.verb) === matches
}

export const testCondition = <T extends GenericSubjects>({
  subjects,
  values,
  condition,
}: {
  subjects: T
  values: Record<string, any>
  condition: Condition
}) => {
  const subject = subjects[condition.subject]

  if (isValueCondition(subject)) {
    return testValueCondition(values, condition)
  }

  if (isArrayCondition(subject)) {
    return testArrayCondition(subject, values, condition)
  }

  // TODO: add error
  return false
}

export const validateConditions = <T extends GenericSubjects>(
  subjects: T,
  conditions: Conditions
) => {
  const valid: Condition[] = []
  const invalid: Condition[] = []

  conditions.forEach(condition => {
    const subject = subjects[condition.subject]

    // nullish verb defaults to the default subject type operator (is/contains)
    const isValidOperator =
      condition.verb == null || condition.verb in VERB_OPERATORS[subject.type]

    const isValid = subject && isValidOperator

    if (isValid) {
      valid.push(condition)
    } else {
      invalid.push(condition)
    }
  })

  return { valid, invalid }
}

export const testConditions = ({
  subjects,
  conditions,
  matching,
  values,
}: {
  subjects: GenericSubjects
  conditions: Conditions
  matching: MatchType
  values: Values
}) => {
  const {
    valid: validConditions,
    invalid: invalidConditions,
  } = validateConditions(subjects, conditions)

  if (invalidConditions.length > 0) {
    console.error(
      `[condition-layout] One or more invalid conditions were provided: ${invalidConditions
        .map(({ subject }) => `"${subject}"`)
        .join(', ')}`
    )
    return { matches: null }
  }

  const results = validConditions.map(condition =>
    testCondition({ subjects, values, condition })
  )

  let matches = results.reduce((acc: boolean | null, conditionMatch) => {
    if (matching === 'all') {
      return (acc ?? true) && conditionMatch
    }

    if (matching === 'any') {
      return (acc ?? false) || conditionMatch
    }

    if (matching === 'none') {
      return (acc ?? true) && !conditionMatch
    }

    return null
  }, null)

  if (matches == null) {
    matches = false
    // TODO: Add error
  }

  return { matches }
}
