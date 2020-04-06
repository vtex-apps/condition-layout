const VERB_OPERATORS: Record<string, Set<string>> = {
  value: new Set(['is', 'is-not']),
  array: new Set(['contains', 'does-not-contain']),
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
      condition.verb == null ||
      VERB_OPERATORS?.[subject.type].has(condition.verb)

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
  match = 'all',
  values,
}: {
  subjects: GenericSubjects
  conditions: Conditions
  match?: MatchType
  values: Values
}): { matches: boolean } => {
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
    return { matches: false }
  }

  const results = validConditions.map(condition =>
    testCondition({ subjects, values, condition })
  )

  let matches = results.reduce((acc: boolean | null, conditionMatch) => {
    if (match === 'all') {
      return (acc ?? true) && conditionMatch
    }

    if (match === 'any') {
      return (acc ?? false) || conditionMatch
    }

    if (match === 'none') {
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
